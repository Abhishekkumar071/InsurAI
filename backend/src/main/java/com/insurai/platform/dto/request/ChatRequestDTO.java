package com.insurai.platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Data
public class ChatRequestDTO {

    @NotBlank(message = "Message cannot be empty")
    private String message;

    private List<ChatMessage> history;   // optional, previous turns

    @Data
    public static class ChatMessage {
        private String role;   // "user" or "model"
        private String text;
    }
}