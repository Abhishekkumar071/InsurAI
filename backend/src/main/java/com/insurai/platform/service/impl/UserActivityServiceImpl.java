package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.UserActivityRequestDTO;
import com.insurai.platform.dto.response.UserActivityResponseDTO;
import com.insurai.platform.entity.Policy;
import com.insurai.platform.entity.UserActivity;
import com.insurai.platform.entity.Users;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.repository.UserActivityRepository;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.UserActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserActivityServiceImpl implements UserActivityService {

    private final UserActivityRepository userActivityRepository;
    private final UserRepository userRepository;
    private final PolicyRepository policyRepository;

    @Override
    @Transactional
    public UserActivityResponseDTO logActivity(String email, UserActivityRequestDTO requestDto) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        Policy policy = policyRepository.findById(requestDto.getPolicyId())
                .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + requestDto.getPolicyId()));

        UserActivity activity = UserActivity.builder()
                .user(user)
                .policy(policy)
                .actionType(requestDto.getActionType())
                .build();

        return mapToResponse(userActivityRepository.save(activity));
    }

    @Override
    public List<UserActivityResponseDTO> getMyActivities(String email) {
        return userActivityRepository.findByUser_EmailOrderByTimestampDesc(email)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    private UserActivityResponseDTO mapToResponse(UserActivity activity) {
        return UserActivityResponseDTO.builder()
                .id(activity.getId())
                .policyId(activity.getPolicy().getId())
                .policyName(activity.getPolicy().getPolicyName())
                .actionType(activity.getActionType())
                .timestamp(activity.getTimestamp())
                .build();
    }
}