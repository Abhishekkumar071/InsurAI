package com.insurai.platform.controller;

import com.insurai.platform.dto.request.PolicyApplicationRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.PolicyApplicationResponseDTO;
import com.insurai.platform.entity.ApplicationStatus;
import com.insurai.platform.service.PolicyApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class PolicyApplicationController {

    private final PolicyApplicationService applicationService;

    // USER: apply for a policy
    @PostMapping("/apply")
    public ResponseEntity<ApiResponse<PolicyApplicationResponseDTO>> apply(
            @Valid @RequestBody PolicyApplicationRequestDTO requestDto,
            Authentication authentication) {

        PolicyApplicationResponseDTO response = applicationService.apply(authentication.getName(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Application submitted successfully", response));
    }

    // USER: track own applications
    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<PolicyApplicationResponseDTO>>> myApplications(Authentication authentication) {
        List<PolicyApplicationResponseDTO> response = applicationService.getMyApplications(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Applications fetched", response));
    }

    // ADMIN: view all applications (optional status filter)
    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<PolicyApplicationResponseDTO>>> allApplications(
            @RequestParam(required = false) ApplicationStatus status) {

        List<PolicyApplicationResponseDTO> response = applicationService.getAllApplications(status);
        return ResponseEntity.ok(ApiResponse.success("Applications fetched", response));
    }

    // ADMIN: approve or reject
    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<ApiResponse<PolicyApplicationResponseDTO>> updateStatus(
            @PathVariable Long id,
            @RequestParam ApplicationStatus status,
            @RequestParam(required = false) String remarks) {

        PolicyApplicationResponseDTO response = applicationService.updateStatus(id, status, remarks);
        return ResponseEntity.ok(ApiResponse.success("Application status updated", response));
    }
}