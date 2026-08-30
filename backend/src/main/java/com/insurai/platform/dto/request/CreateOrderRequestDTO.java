package com.insurai.platform.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateOrderRequestDTO {

    @NotNull(message = "Application ID is required")
    private Long applicationId;
}