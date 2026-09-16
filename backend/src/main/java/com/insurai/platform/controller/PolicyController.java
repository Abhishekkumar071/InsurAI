package com.insurai.platform.controller;

import com.insurai.platform.dto.request.PolicyRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.PageResponseDTO;
import com.insurai.platform.dto.response.PolicyResponseDTO;
import com.insurai.platform.entity.InsuranceCategory;
import com.insurai.platform.service.PolicyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
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
    public ResponseEntity<ApiResponse<PageResponseDTO<PolicyResponseDTO>>> getAllPolicies(
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(ApiResponse.success("Policies fetched", policyService.getAllActivePoliciesPaged(pageable)));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<PageResponseDTO<PolicyResponseDTO>>> getByCategory(
            @PathVariable InsuranceCategory category,
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        return ResponseEntity.ok(ApiResponse.success("Policies fetched", policyService.getPoliciesByCategoryPaged(category, pageable)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PolicyResponseDTO>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Policy fetched", policyService.getPolicyById(id)));
    }

    @PatchMapping("/admin/{id}/deactivate")
    public ResponseEntity<ApiResponse<Void>> deactivate(@PathVariable Long id, Authentication authentication) {
        policyService.deactivatePolicy(id, authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Policy deactivated", null));
    }
}