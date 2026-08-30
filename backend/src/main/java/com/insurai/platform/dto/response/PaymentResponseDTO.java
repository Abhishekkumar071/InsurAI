package com.insurai.platform.dto.response;

import com.insurai.platform.entity.PaymentStatus;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class PaymentResponseDTO {
    private Long paymentId;
    private Long applicationId;
    private String razorpayOrderId;
    private BigDecimal amount;
    private String currency;
    private PaymentStatus status;
    private String razorpayKeyId;   // frontend ko checkout widget kholne ke liye chahiye hoga
}