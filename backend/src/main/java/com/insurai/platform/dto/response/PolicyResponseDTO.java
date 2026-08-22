package com.insurai.platform.dto.response;

import com.insurai.platform.entity.InsuranceCategory;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Builder
public class PolicyResponseDTO {
    private Long id;
    private String policyName;
    private InsuranceCategory category;
    private BigDecimal basePremium;
    private BigDecimal coverageAmount;
    private Integer tenureYears;
    private String description;
    private String benefits;
    private String termsAndConditions;
    private Boolean isActive;
    private LocalDateTime createdAt;
}