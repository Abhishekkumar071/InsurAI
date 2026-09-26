package com.insurai.platform.service;

import com.insurai.platform.dto.response.RecommendationResponseDTO;

import java.util.List;

public interface RecommendationService {
    List<RecommendationResponseDTO> getRecommendationsForUser(String email);
}