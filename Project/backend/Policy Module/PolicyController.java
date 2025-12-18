package com.java.example.policy.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.java.example.entity.Policy;
import com.java.example.policy.dto.PolicyDto;
import com.java.example.policy.service.PolicyService;

import java.util.List;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "http://localhost:5173")
public class PolicyController {
    
    @Autowired
    private PolicyService policyService;
    
    // Get all policies
    @GetMapping
    public ResponseEntity<List<PolicyDto>> getAllPolicies(
        @RequestParam(required = false) String category) {
        List<PolicyDto> policies;
        if (category != null && !category.isEmpty()) {
            policies = policyService.getPoliciesByCategory(category);
        } else {
            policies = policyService.getAllPolicies();
        }
        return ResponseEntity.ok(policies);
    }
    
    // Get policy by ID
    @GetMapping("/{id}")
    public ResponseEntity<PolicyDto> getPolicyById(@PathVariable Long id) {
        PolicyDto policy = policyService.getPolicyById(id);
        if (policy != null) {
            return ResponseEntity.ok(policy);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    // Create new policy
    @PostMapping
    public ResponseEntity<PolicyDto> createPolicy(@RequestBody Policy policy) {
        PolicyDto createdPolicy = policyService.createPolicy(policy);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPolicy);
    }
    
    // Update policy
    @PutMapping("/{id}")
    public ResponseEntity<PolicyDto> updatePolicy(@PathVariable Long id, @RequestBody Policy policyDetails) {
        PolicyDto updatedPolicy = policyService.updatePolicy(id, policyDetails);
        if (updatedPolicy != null) {
            return ResponseEntity.ok(updatedPolicy);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
    
    // Delete policy
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePolicy(@PathVariable Long id) {
        if (policyService.deletePolicy(id)) {
            return ResponseEntity.ok("Policy deleted successfully!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Policy not found!");
    }
}
