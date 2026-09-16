package com.insurai.platform.service.impl;

import com.insurai.platform.dto.response.AuditLogResponseDTO;
import com.insurai.platform.dto.response.PageResponseDTO;
import com.insurai.platform.entity.AuditLog;
import com.insurai.platform.repository.AuditLogRepository;
import com.insurai.platform.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void log(String entityType, Long entityId, String action, String performedBy, String details) {
        try {
            AuditLog auditLog = AuditLog.builder()
                    .entityType(entityType)
                    .entityId(entityId)
                    .action(action)
                    .performedBy(performedBy)
                    .details(details)
                    .build();
            auditLogRepository.save(auditLog);
        } catch (Exception e) {
            // Audit failure must never break the underlying business operation.
            log.error("Failed to write audit log [{} {} {}]: {}", entityType, entityId, action, e.getMessage());
        }
    }

    @Override
    public PageResponseDTO<AuditLogResponseDTO> getLogsForEntity(String entityType, Long entityId, Pageable pageable) {
        Page<AuditLog> page = auditLogRepository.findByEntityTypeAndEntityIdOrderByTimestampDesc(entityType, entityId, pageable);
        return PageResponseDTO.from(page.map(this::mapToResponse));
    }

    @Override
    public PageResponseDTO<AuditLogResponseDTO> getAllLogs(Pageable pageable) {
        Page<AuditLog> page = auditLogRepository.findAllByOrderByTimestampDesc(pageable);
        return PageResponseDTO.from(page.map(this::mapToResponse));
    }

    private AuditLogResponseDTO mapToResponse(AuditLog log) {
        return AuditLogResponseDTO.builder()
                .id(log.getId())
                .entityType(log.getEntityType())
                .entityId(log.getEntityId())
                .action(log.getAction())
                .performedBy(log.getPerformedBy())
                .details(log.getDetails())
                .timestamp(log.getTimestamp())
                .build();
    }
}