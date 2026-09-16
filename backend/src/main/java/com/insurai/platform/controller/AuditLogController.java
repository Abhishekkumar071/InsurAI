package com.insurai.platform.controller;

import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.AuditLogResponseDTO;
import com.insurai.platform.dto.response.PageResponseDTO;
import com.insurai.platform.service.AuditLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/audit-logs")
@RequiredArgsConstructor
public class AuditLogController {

    private final AuditLogService auditLogService;

    @GetMapping("/admin")
    public ResponseEntity<ApiResponse<PageResponseDTO<AuditLogResponseDTO>>> getAll(
            @PageableDefault(size = 20, sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Audit logs fetched", auditLogService.getAllLogs(pageable)));
    }

    @GetMapping("/admin/{entityType}/{entityId}")
    public ResponseEntity<ApiResponse<PageResponseDTO<AuditLogResponseDTO>>> getForEntity(
            @PathVariable String entityType,
            @PathVariable Long entityId,
            @PageableDefault(size = 20, sort = "timestamp", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(ApiResponse.success("Audit logs fetched", auditLogService.getLogsForEntity(entityType, entityId, pageable)));
    }
}