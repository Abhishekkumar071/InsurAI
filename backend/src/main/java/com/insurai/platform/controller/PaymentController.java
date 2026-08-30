package com.insurai.platform.controller;

import com.insurai.platform.dto.request.CreateOrderRequestDTO;
import com.insurai.platform.dto.request.VerifyPaymentRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.PaymentResponseDTO;
import com.insurai.platform.service.PaymentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/create-order")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> createOrder(
            @Valid @RequestBody CreateOrderRequestDTO requestDto,
            Authentication authentication) {

        PaymentResponseDTO response = paymentService.createOrder(authentication.getName(), requestDto);
        return ResponseEntity.ok(ApiResponse.success("Razorpay order created", response));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<PaymentResponseDTO>> verify(
            @Valid @RequestBody VerifyPaymentRequestDTO requestDto) {

        PaymentResponseDTO response = paymentService.verifyPayment(requestDto);
        return ResponseEntity.ok(ApiResponse.success("Payment verified successfully", response));
    }
}