package com.insurai.platform.service;

import com.insurai.platform.dto.response.AuditLogResponseDTO;
import com.insurai.platform.dto.response.PageResponseDTO;
import org.springframework.data.domain.Pageable;

public interface AuditLogService {
    void log(String entityType, Long entityId, String action, String performedBy, String details);
    PageResponseDTO<AuditLogResponseDTO> getLogsForEntity(String entityType, Long entityId, Pageable pageable);
    PageResponseDTO<AuditLogResponseDTO> getAllLogs(Pageable pageable);
}