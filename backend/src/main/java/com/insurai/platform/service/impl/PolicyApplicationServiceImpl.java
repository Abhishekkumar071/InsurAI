package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.PolicyApplicationRequestDTO;
import com.insurai.platform.dto.response.PolicyApplicationResponseDTO;
import com.insurai.platform.entity.*;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.exception.DuplicateResourceException;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.PolicyApplicationRepository;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.PolicyApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PolicyApplicationServiceImpl implements PolicyApplicationService {

    private final PolicyApplicationRepository applicationRepository;
    private final UserRepository userRepository;
    private final PolicyRepository policyRepository;

    @Override
    @Transactional
    public PolicyApplicationResponseDTO apply(String email, PolicyApplicationRequestDTO requestDto) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        Policy policy = policyRepository.findById(requestDto.getPolicyId())
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + requestDto.getPolicyId()));

        boolean alreadyPending = applicationRepository
                .existsByUser_EmailAndPolicy_IdAndStatus(email, requestDto.getPolicyId(), ApplicationStatus.PENDING);

        if (alreadyPending) {
            throw new DuplicateResourceException("You already have a pending application for this policy");
        }

        PolicyApplication application = PolicyApplication.builder()
                .user(user)
                .policy(policy)
                .status(ApplicationStatus.PENDING)
                .build();

        return mapToResponse(applicationRepository.save(application));
    }

    @Override
    public List<PolicyApplicationResponseDTO> getMyApplications(String email) {
        return applicationRepository.findByUser_EmailOrderByAppliedAtDesc(email)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<PolicyApplicationResponseDTO> getAllApplications(ApplicationStatus statusFilter) {
        List<PolicyApplication> applications = (statusFilter != null)
                ? applicationRepository.findByStatusOrderByAppliedAtDesc(statusFilter)
                : applicationRepository.findAllByOrderByAppliedAtDesc();

        return applications.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PolicyApplicationResponseDTO updateStatus(Long applicationId, ApplicationStatus newStatus, String remarks) {
        PolicyApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new BadRequestException("Only PENDING applications can be updated. Current status: " + application.getStatus());
        }

        if (newStatus == ApplicationStatus.PENDING) {
            throw new BadRequestException("Cannot set status back to PENDING");
        }

        application.setStatus(newStatus);
        application.setAdminRemarks(remarks);

        return mapToResponse(applicationRepository.save(application));
    }

    private PolicyApplicationResponseDTO mapToResponse(PolicyApplication app) {
        return PolicyApplicationResponseDTO.builder()
                .id(app.getId())
                .userId(app.getUser().getId())
                .userFullName(app.getUser().getFullName())
                .userEmail(app.getUser().getEmail())
                .policyId(app.getPolicy().getId())
                .policyName(app.getPolicy().getPolicyName())
                .status(app.getStatus())
                .adminRemarks(app.getAdminRemarks())
                .appliedAt(app.getAppliedAt())
                .updatedAt(app.getUpdatedAt())
                .build();
    }
}