package com.insurai.platform.controller;

import com.insurai.platform.dto.request.UserActivityRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.UserActivityResponseDTO;
import com.insurai.platform.service.UserActivityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/activity")
@RequiredArgsConstructor
public class UserActivityController {

    private final UserActivityService userActivityService;

    @PostMapping("/log")
    public ResponseEntity<ApiResponse<UserActivityResponseDTO>> log(
            @Valid @RequestBody UserActivityRequestDTO requestDto,
            Authentication authentication) {

        UserActivityResponseDTO response =
                userActivityService.logActivity(authentication.getName(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Activity logged", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<UserActivityResponseDTO>>> myActivities(Authentication authentication) {
        List<UserActivityResponseDTO> response = userActivityService.getMyActivities(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Activities fetched", response));
    }
}