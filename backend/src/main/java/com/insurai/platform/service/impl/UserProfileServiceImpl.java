package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.UserProfileRequestDTO;
import com.insurai.platform.dto.response.UserProfileResponseDTO;
import com.insurai.platform.entity.UserProfile;
import com.insurai.platform.entity.Users;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.UserProfileRepository;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileServiceImpl implements UserProfileService {

    private final UserProfileRepository userProfileRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserProfileResponseDTO createOrUpdateProfile(String email, UserProfileRequestDTO requestDto) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        UserProfile profile = userProfileRepository.findByUser_Email(email)
                .orElse(UserProfile.builder().user(user).build());

        profile.setDateOfBirth(requestDto.getDateOfBirth());
        profile.setOccupation(requestDto.getOccupation());
        profile.setIncomeBracket(requestDto.getIncomeBracket());
        profile.setDependents(requestDto.getDependents());
        profile.setSmoker(requestDto.getSmoker());
        profile.setExistingHealthConditions(requestDto.getExistingHealthConditions());

        return mapToResponse(userProfileRepository.save(profile));
    }

    @Override
    public UserProfileResponseDTO getMyProfile(String email) {
        UserProfile profile = userProfileRepository.findByUser_Email(email)
                .orElseThrow(() -> new ResourceNotFoundException("Profile not found. Please create your profile first."));
        return mapToResponse(profile);
    }

    private UserProfileResponseDTO mapToResponse(UserProfile profile) {
        return UserProfileResponseDTO.builder()
                .id(profile.getId())
                .userId(profile.getUser().getId())
                .fullName(profile.getUser().getFullName())
                .email(profile.getUser().getEmail())
                .dateOfBirth(profile.getDateOfBirth())
                .occupation(profile.getOccupation())
                .incomeBracket(profile.getIncomeBracket())
                .dependents(profile.getDependents())
                .smoker(profile.getSmoker())
                .existingHealthConditions(profile.getExistingHealthConditions())
                .createdAt(profile.getCreatedAt())
                .updatedAt(profile.getUpdatedAt())
                .build();
    }
}