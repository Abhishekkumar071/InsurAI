package com.insurai.platform.service;

import com.insurai.platform.dto.request.CreateOrderRequestDTO;
import com.insurai.platform.dto.request.VerifyPaymentRequestDTO;
import com.insurai.platform.dto.response.PaymentResponseDTO;

public interface PaymentService {
    PaymentResponseDTO createOrder(String email, CreateOrderRequestDTO requestDto);
    PaymentResponseDTO verifyPayment(VerifyPaymentRequestDTO requestDto);
}