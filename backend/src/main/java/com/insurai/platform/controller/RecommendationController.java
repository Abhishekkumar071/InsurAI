package com.insurai.platform.controller;

import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.RecommendationResponseDTO;
import com.insurai.platform.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<RecommendationResponseDTO>>> getMyRecommendations(Authentication authentication) {
        List<RecommendationResponseDTO> response = recommendationService.getRecommendationsForUser(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Recommendations fetched", response));
    }
}