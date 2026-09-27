package com.insurai.platform.dto.response;

import com.insurai.platform.entity.ActionType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class UserActivityResponseDTO {
    private Long id;
    private Long policyId;
    private String policyName;
    private ActionType actionType;
    private LocalDateTime timestamp;
}