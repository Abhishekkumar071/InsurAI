package com.insurai.platform.service;

import com.insurai.platform.dto.request.PolicyRequestDTO;
import com.insurai.platform.dto.response.PageResponseDTO;
import com.insurai.platform.dto.response.PolicyResponseDTO;
import com.insurai.platform.entity.InsuranceCategory;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PolicyService {
    PolicyResponseDTO createPolicy(PolicyRequestDTO requestDto);
    List<PolicyResponseDTO> getAllActivePolicies();
    List<PolicyResponseDTO> getPoliciesByCategory(InsuranceCategory category);
    PolicyResponseDTO getPolicyById(Long id);
    void deactivatePolicy(Long id, String performedByEmail);
    PageResponseDTO<PolicyResponseDTO> getAllActivePoliciesPaged(Pageable pageable);
    PageResponseDTO<PolicyResponseDTO> getPoliciesByCategoryPaged(InsuranceCategory category, Pageable pageable);
}