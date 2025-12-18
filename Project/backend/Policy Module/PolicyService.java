package com.java.example.policy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.example.entity.Policy;
import com.java.example.policy.dto.PolicyDto;
import com.java.example.policy.repository.PolicyRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PolicyService {
    
    @Autowired
    private PolicyRepository policyRepository;
    
    // Get all policies
    public List<PolicyDto> getAllPolicies() {
        return policyRepository.findAll().stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    // Get policies by category
    public List<PolicyDto> getPoliciesByCategory(String category) {
        return policyRepository.findByCategory(category).stream()
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }
    
    // Get policy by ID
    public PolicyDto getPolicyById(Long policyId) {
        Optional<Policy> policy = policyRepository.findById(policyId);
        return policy.map(this::convertToDto).orElse(null);
    }
    
    // Create new policy
    public PolicyDto createPolicy(Policy policy) {
        Policy savedPolicy = policyRepository.save(policy);
        return convertToDto(savedPolicy);
    }
    
    // Update policy
    public PolicyDto updatePolicy(Long policyId, Policy policyDetails) {
        Optional<Policy> existingPolicy = policyRepository.findById(policyId);
        if (existingPolicy.isPresent()) {
            Policy policy = existingPolicy.get();
            policy.setPolicyName(policyDetails.getPolicyName());
            policy.setPremiumAmount(policyDetails.getPremiumAmount());
            policy.setCategory(policyDetails.getCategory());
            policy.setDescription(policyDetails.getDescription());
            policy.setBenefits(policyDetails.getBenefits());
            policy.setTermsConditions(policyDetails.getTermsConditions());
            
            Policy updatedPolicy = policyRepository.save(policy);
            return convertToDto(updatedPolicy);
        }
        return null;
    }
    
    // Delete policy
    public boolean deletePolicy(Long policyId) {
        if (policyRepository.existsById(policyId)) {
            policyRepository.deleteById(policyId);
            return true;
        }
        return false;
    }
    
    // Helper method to convert Policy to PolicyDto
    private PolicyDto convertToDto(Policy policy) {
        return new PolicyDto(
            policy.getPolicyId(),
            policy.getPolicyName(),
            policy.getPremiumAmount(),
            policy.getCategory(),
            policy.getDescription(),
            policy.getBenefits(),
            policy.getTermsConditions()
        );
    }
}
