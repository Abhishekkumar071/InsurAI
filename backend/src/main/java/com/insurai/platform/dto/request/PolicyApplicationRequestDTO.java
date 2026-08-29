package com.insurai.platform.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PolicyApplicationRequestDTO {

    @NotNull(message = "Policy ID is required")
    private Long policyId;
}