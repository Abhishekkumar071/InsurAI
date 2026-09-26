package com.insurai.platform.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class RecommendationResponseDTO {
    private Long policyId;
    private String policyName;
    private Double score;
    private String reason;
}