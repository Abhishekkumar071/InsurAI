package com.insurai.platform.dto.request;

import com.insurai.platform.entity.ActionType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserActivityRequestDTO {

    @NotNull(message = "Policy ID is required")
    private Long policyId;

    @NotNull(message = "Action type is required")
    private ActionType actionType;
}