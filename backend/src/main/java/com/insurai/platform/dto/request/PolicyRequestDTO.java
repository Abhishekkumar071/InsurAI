package com.insurai.platform.dto.request;

import com.insurai.platform.entity.InsuranceCategory;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PolicyRequestDTO {

    @NotBlank(message = "Policy name is required")
    @Size(min = 3, max = 150, message = "Policy name must be between 3 and 150 characters")
    private String policyName;

    @NotNull(message = "Insurance category is required")
    private InsuranceCategory category;

    @NotNull(message = "Base premium is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Base premium must be greater than 0")
    private BigDecimal basePremium;

    @NotNull(message = "Coverage amount is required")
    @DecimalMin(value = "1000.0", message = "Minimum coverage amount is 1000")
    private BigDecimal coverageAmount;

    @NotNull(message = "Tenure is required")
    @Min(value = 1, message = "Tenure must be at least 1 year")
    @Max(value = 100, message = "Tenure cannot exceed 100 years")
    private Integer tenureYears;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    private String benefits;
    private String termsAndConditions;
}