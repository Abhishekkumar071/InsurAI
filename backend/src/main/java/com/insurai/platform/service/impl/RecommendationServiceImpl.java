package com.insurai.platform.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.insurai.platform.dto.request.RecommendationRequestDTO;
import com.insurai.platform.dto.response.RecommendationResponseDTO;
import com.insurai.platform.entity.Users;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationServiceImpl implements RecommendationService {

    private final RestClient recommendationRestClient;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Override
    @SuppressWarnings("unchecked")
    public List<RecommendationResponseDTO> getRecommendationsForUser(String email) {
        try {
            Users user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            RecommendationRequestDTO requestBody = new RecommendationRequestDTO(user.getId(), 5);

            String jsonBody = objectMapper.writeValueAsString(requestBody);
            log.info("Sending recommendation request JSON: {}", jsonBody);

            Map<String, Object> response = recommendationRestClient.post()
                    .uri("/recommend")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jsonBody)
                    .retrieve()
                    .body(Map.class);

            List<Map<String, Object>> recs = (List<Map<String, Object>>) response.get("recommendations");

            return recs.stream()
                    .map(r -> RecommendationResponseDTO.builder()
                            .policyId(Long.valueOf(r.get("policyId").toString()))
                            .policyName((String) r.get("policyName"))
                            .score(Double.valueOf(r.get("score").toString()))
                            .reason((String) r.get("reason"))
                            .build())
                    .collect(Collectors.toList());

        } catch (Exception e) {
            log.warn("Recommendation service unavailable, returning empty list: {}", e.getMessage());
            return Collections.emptyList();
        }
    }
}