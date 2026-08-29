package com.insurai.platform.service;

import com.insurai.platform.dto.request.PolicyApplicationRequestDTO;
import com.insurai.platform.dto.response.PolicyApplicationResponseDTO;
import com.insurai.platform.entity.ApplicationStatus;

import java.util.List;

public interface PolicyApplicationService {
    PolicyApplicationResponseDTO apply(String email, PolicyApplicationRequestDTO requestDto);
    List<PolicyApplicationResponseDTO> getMyApplications(String email);
    List<PolicyApplicationResponseDTO> getAllApplications(ApplicationStatus statusFilter);
    PolicyApplicationResponseDTO updateStatus(Long applicationId, ApplicationStatus newStatus, String remarks);
}