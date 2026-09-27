package com.insurai.platform.controller;

import com.insurai.platform.dto.request.UserProfileRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.UserProfileResponseDTO;
import com.insurai.platform.service.UserProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @PutMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> createOrUpdate(
            @Valid @RequestBody UserProfileRequestDTO requestDto,
            Authentication authentication) {

        UserProfileResponseDTO response =
                userProfileService.createOrUpdateProfile(authentication.getName(), requestDto);
        return ResponseEntity.ok(ApiResponse.success("Profile saved successfully", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserProfileResponseDTO>> getMyProfile(Authentication authentication) {
        UserProfileResponseDTO response = userProfileService.getMyProfile(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Profile fetched", response));
    }
}