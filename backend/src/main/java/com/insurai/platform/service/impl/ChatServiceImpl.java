package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.ChatRequestDTO;
import com.insurai.platform.dto.response.ChatResponseDTO;
import com.insurai.platform.entity.Policy;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ChatServiceImpl implements ChatService {

    private final RestClient geminiRestClient;
    private final PolicyRepository policyRepository;

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    public ChatServiceImpl(RestClient geminiRestClient, PolicyRepository policyRepository) {
        this.geminiRestClient = geminiRestClient;
        this.policyRepository = policyRepository;
    }

    @Override
    public ChatResponseDTO askAssistant(ChatRequestDTO requestDto) {
        String systemContext = buildSystemContext();

        List<Map<String, Object>> contents = new ArrayList<>();

        // System instruction as the first "user" turn — Gemini's REST API doesn't
        // have a dedicated system-role field in this simpler content format, so we
        // prepend it as context, followed by a model acknowledgment.
        contents.add(turn("user", systemContext));
        contents.add(turn("model", "Understood. I'll help visitors find the right InsurAI policy based on this catalog."));

        if (requestDto.getHistory() != null) {
            for (ChatRequestDTO.ChatMessage msg : requestDto.getHistory()) {
                contents.add(turn(msg.getRole(), msg.getText()));
            }
        }

        contents.add(turn("user", requestDto.getMessage()));

        Map<String, Object> body = Map.of("contents", contents);

        try {
            Map<String, Object> response = geminiRestClient.post()
                    .uri("/models/{model}:generateContent?key={key}", model, apiKey)
                    .body(body)
                    .retrieve()
                    .body(Map.class);

            String reply = extractReply(response);
            return ChatResponseDTO.builder().reply(reply).build();

        } catch (Exception e) {
            log.error("Gemini API call failed: {}", e.getMessage());
            throw new BadRequestException("The assistant is temporarily unavailable. Please try again.");
        }
    }

    private Map<String, Object> turn(String role, String text) {
        Map<String, Object> map = new HashMap<>();
        map.put("role", role);
        map.put("parts", List.of(Map.of("text", text)));
        return map;
    }

    @SuppressWarnings("unchecked")
    private String extractReply(Map<String, Object> response) {
        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
        if (candidates == null || candidates.isEmpty()) {
            return "I couldn't generate a response right now. Please try rephrasing your question.";
        }
        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
        return (String) parts.get(0).get("text");
    }

    private String buildSystemContext() {
        List<Policy> policies = policyRepository.findAllByIsActiveTrue();

        String catalog = policies.stream()
                .map(p -> String.format(
                        "- %s (%s): Premium ₹%.0f/yr, Coverage ₹%.0f, Tenure %d yrs. %s",
                        p.getPolicyName(), p.getCategory(), p.getBasePremium(),
                        p.getCoverageAmount(), p.getTenureYears(), p.getDescription()))
                .collect(Collectors.joining("\n"));

        return """
                You are the InsurAI Assistant, a friendly and knowledgeable helper for an
                insurance comparison and application platform. You help visitors understand
                insurance concepts and find the right policy from InsurAI's catalog below.

                RULES:
                - Only recommend policies from the catalog below — never invent policy names or numbers.
                - Keep answers concise (3-5 sentences) unless asked for detail.
                - If asked something unrelated to insurance, politely redirect to insurance topics.
                - You cannot process applications or payments — direct users to browse/apply
                  on the website for that.
                - Do not give personalized financial or legal advice — offer general guidance only.

                CURRENT POLICY CATALOG:
                %s
                """.formatted(catalog);
    }
}