package com.insurai.platform.dto.response;

import com.insurai.platform.entity.ApplicationStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class PolicyApplicationResponseDTO {
    private Long id;
    private Long userId;
    private String userFullName;
    private String userEmail;
    private Long policyId;
    private String policyName;
    private ApplicationStatus status;
    private String adminRemarks;
    private LocalDateTime appliedAt;
    private LocalDateTime updatedAt;
}