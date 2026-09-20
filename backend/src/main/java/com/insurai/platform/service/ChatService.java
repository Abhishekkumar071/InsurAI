package com.insurai.platform.service;

import com.insurai.platform.dto.request.ChatRequestDTO;
import com.insurai.platform.dto.response.ChatResponseDTO;

public interface ChatService {
    ChatResponseDTO askAssistant(ChatRequestDTO requestDto);
}