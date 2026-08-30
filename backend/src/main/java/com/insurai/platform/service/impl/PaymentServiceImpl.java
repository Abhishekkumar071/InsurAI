package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.CreateOrderRequestDTO;
import com.insurai.platform.dto.request.VerifyPaymentRequestDTO;
import com.insurai.platform.dto.response.PaymentResponseDTO;
import com.insurai.platform.entity.*;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.exception.DuplicateResourceException;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.PaymentRepository;
import com.insurai.platform.repository.PolicyApplicationRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements com.insurai.platform.service.PaymentService {

    private final PaymentRepository paymentRepository;
    private final PolicyApplicationRepository applicationRepository;
    private final RazorpayClient razorpayClient;

    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    @Value("${razorpay.key-secret}")
    private String razorpayKeySecret;

    @Override
    @Transactional
    public PaymentResponseDTO createOrder(String email, CreateOrderRequestDTO requestDto) {
        PolicyApplication application = applicationRepository.findById(requestDto.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + requestDto.getApplicationId()));

        if (!application.getUser().getEmail().equals(email)) {
            throw new BadRequestException("This application does not belong to you");
        }

        if (application.getStatus() != ApplicationStatus.APPROVED) {
            throw new BadRequestException("Payment allowed only for APPROVED applications. Current status: " + application.getStatus());
        }

        if (paymentRepository.existsByApplication_IdAndStatus(application.getId(), PaymentStatus.SUCCESS)) {
            throw new DuplicateResourceException("Payment already completed for this application");
        }

        BigDecimal amount = application.getPolicy().getBasePremium();

        try {
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amount.multiply(BigDecimal.valueOf(100)).intValue());  // paise mein convert
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "receipt_app_" + application.getId());

            Order razorpayOrder = razorpayClient.orders.create(orderRequest);

            Payment payment = Payment.builder()
                    .application(application)
                    .razorpayOrderId(razorpayOrder.get("id"))
                    .amount(amount)
                    .status(PaymentStatus.CREATED)
                    .build();

            Payment saved = paymentRepository.save(payment);

            return PaymentResponseDTO.builder()
                    .paymentId(saved.getId())
                    .applicationId(application.getId())
                    .razorpayOrderId(saved.getRazorpayOrderId())
                    .amount(saved.getAmount())
                    .currency(saved.getCurrency())
                    .status(saved.getStatus())
                    .razorpayKeyId(razorpayKeyId)
                    .build();

        } catch (Exception e) {
            throw new BadRequestException("Failed to create Razorpay order: " + e.getMessage());
        }
    }

    @Override
    @Transactional
    public PaymentResponseDTO verifyPayment(VerifyPaymentRequestDTO requestDto) {
        Payment payment = paymentRepository.findByRazorpayOrderId(requestDto.getRazorpayOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Payment order not found"));

        try {
            Map<String, String> attributes = new HashMap<>();
            attributes.put("razorpay_order_id", requestDto.getRazorpayOrderId());
            attributes.put("razorpay_payment_id", requestDto.getRazorpayPaymentId());
            attributes.put("razorpay_signature", requestDto.getRazorpaySignature());

            boolean isValid = Utils.verifyPaymentSignature(attributes, razorpayKeySecret);

            if (!isValid) {
                payment.setStatus(PaymentStatus.FAILED);
                paymentRepository.save(payment);
                throw new BadRequestException("Payment signature verification failed");
            }

            payment.setRazorpayPaymentId(requestDto.getRazorpayPaymentId());
            payment.setRazorpaySignature(requestDto.getRazorpaySignature());
            payment.setStatus(PaymentStatus.SUCCESS);
            paymentRepository.save(payment);

            PolicyApplication application = payment.getApplication();
            application.setStatus(ApplicationStatus.ACTIVE);
            applicationRepository.save(application);

            return PaymentResponseDTO.builder()
                    .paymentId(payment.getId())
                    .applicationId(application.getId())
                    .razorpayOrderId(payment.getRazorpayOrderId())
                    .amount(payment.getAmount())
                    .currency(payment.getCurrency())
                    .status(payment.getStatus())
                    .build();

        } catch (BadRequestException e) {
            throw e;
        } catch (Exception e) {
            throw new BadRequestException("Payment verification error: " + e.getMessage());
        }
    }
}