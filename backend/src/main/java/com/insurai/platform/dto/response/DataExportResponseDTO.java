package com.insurai.platform.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Map;

@Getter
@Builder
public class DataExportResponseDTO {
    private Long userId;
    private Integer age;              // computed from dateOfBirth, null if no profile yet
    private String incomeBracket;     // enum name, null if no profile
    private Integer dependents;
    private Boolean smoker;
    private List<Long> viewedPolicyIds;
    private List<Long> appliedPolicyIds;
    private List<Map<String, Object>> policyCatalog;  // id, category, basePremium, coverageAmount, tenureYears
}