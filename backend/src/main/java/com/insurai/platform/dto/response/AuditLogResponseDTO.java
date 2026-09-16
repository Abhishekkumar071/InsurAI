package com.insurai.platform.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class AuditLogResponseDTO {
    private Long id;
    private String entityType;
    private Long entityId;
    private String action;
    private String performedBy;
    private String details;
    private LocalDateTime timestamp;
}