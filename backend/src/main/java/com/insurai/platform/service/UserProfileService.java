package com.insurai.platform.service;

import com.insurai.platform.dto.request.UserProfileRequestDTO;
import com.insurai.platform.dto.response.UserProfileResponseDTO;

public interface UserProfileService {
    UserProfileResponseDTO createOrUpdateProfile(String email, UserProfileRequestDTO requestDto);
    UserProfileResponseDTO getMyProfile(String email);
}