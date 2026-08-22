package com.insurai.platform.controller;

import com.insurai.platform.dto.request.PolicyRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.PolicyResponseDTO;
import com.insurai.platform.entity.InsuranceCategory;
import com.insurai.platform.service.PolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/policies")
@RequiredArgsConstructor
public class PolicyController {

    private final PolicyService policyService;

    @PostMapping("/admin/create")
    public ResponseEntity<ApiResponse<PolicyResponseDTO>> createPolicy(@Valid @RequestBody PolicyRequestDTO requestDto) {
        PolicyResponseDTO created = policyService.createPolicy(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Policy created successfully", created));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<PolicyResponseDTO>>> getAllPolicies() {
        return ResponseEntity.ok(ApiResponse.success("Policies fetched", policyService.getAllActivePolicies()));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<PolicyResponseDTO>>> getByCategory(@PathVariable InsuranceCategory category) {
        return ResponseEntity.ok(ApiResponse.success("Policies fetched", policyService.getPoliciesByCategory(category)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PolicyResponseDTO>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Policy fetched", policyService.getPolicyById(id)));
    }

    @PatchMapping("/admin/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivate(@PathVariable Long id) {
        policyService.deactivatePolicy(id);
        return ResponseEntity.ok(ApiResponse.success("Policy deactivated", null));
    }
}