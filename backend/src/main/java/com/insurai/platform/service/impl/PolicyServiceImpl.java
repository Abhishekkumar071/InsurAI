package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.PolicyRequestDTO;
import com.insurai.platform.dto.response.PolicyResponseDTO;
import com.insurai.platform.entity.InsuranceCategory;
import com.insurai.platform.entity.Policy;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.service.PolicyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PolicyServiceImpl implements PolicyService {

    private final PolicyRepository policyRepository;

    @Override
    @Transactional
    public PolicyResponseDTO createPolicy(PolicyRequestDTO requestDto) {
        Policy policy = Policy.builder()
                .policyName(requestDto.getPolicyName())
                .category(requestDto.getCategory())
                .basePremium(requestDto.getBasePremium())
                .coverageAmount(requestDto.getCoverageAmount())
                .tenureYears(requestDto.getTenureYears())
                .description(requestDto.getDescription())
                .benefits(requestDto.getBenefits())
                .termsAndConditions(requestDto.getTermsAndConditions())
                .isActive(true)
                .build();

        return mapToResponse(policyRepository.save(policy));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PolicyResponseDTO> getAllActivePolicies() {
        return policyRepository.findAllByIsActiveTrue()
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PolicyResponseDTO> getPoliciesByCategory(InsuranceCategory category) {
        return policyRepository.findByCategoryAndIsActiveTrue(category)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public PolicyResponseDTO getPolicyById(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + id));
        return mapToResponse(policy);
    }

    @Override
    @Transactional
    public void deactivatePolicy(Long id) {
        Policy policy = policyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + id));
        policy.setIsActive(false);
        policyRepository.save(policy);
    }

    private PolicyResponseDTO mapToResponse(Policy policy) {
        return PolicyResponseDTO.builder()
                .id(policy.getId())
                .policyName(policy.getPolicyName())
                .category(policy.getCategory())
                .basePremium(policy.getBasePremium())
                .coverageAmount(policy.getCoverageAmount())
                .tenureYears(policy.getTenureYears())
                .description(policy.getDescription())
                .benefits(policy.getBenefits())
                .termsAndConditions(policy.getTermsAndConditions())
                .isActive(policy.getIsActive())
                .createdAt(policy.getCreatedAt())
                .build();
    }
}