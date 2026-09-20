package com.insurai.platform.controller;

import com.insurai.platform.dto.request.ChatRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.ChatResponseDTO;
import com.insurai.platform.service.ChatService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/ask")
    public ResponseEntity<ApiResponse<ChatResponseDTO>> ask(@Valid @RequestBody ChatRequestDTO requestDto) {
        ChatResponseDTO response = chatService.askAssistant(requestDto);
        return ResponseEntity.ok(ApiResponse.success("Response generated", response));
    }
}