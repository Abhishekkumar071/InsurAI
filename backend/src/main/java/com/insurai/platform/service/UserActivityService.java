package com.insurai.platform.service;

import com.insurai.platform.dto.request.UserActivityRequestDTO;
import com.insurai.platform.dto.response.UserActivityResponseDTO;

import java.util.List;

public interface UserActivityService {
    UserActivityResponseDTO logActivity(String email, UserActivityRequestDTO requestDto);
    List<UserActivityResponseDTO> getMyActivities(String email);
}