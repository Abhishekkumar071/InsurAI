package com.insurai.platform.controller;

import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.DataExportResponseDTO;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.service.DataExportService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/internal/data-export")
@RequiredArgsConstructor
public class DataExportController {

    private final DataExportService dataExportService;

    @Value("${recommendation.internal-api-key}")
    private String internalApiKey;

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<DataExportResponseDTO>> exportUserData(
            @PathVariable Long userId,
            @RequestHeader("X-Internal-Api-Key") String providedKey) {

        if (!internalApiKey.equals(providedKey)) {
            throw new BadRequestException("Invalid internal API key");
        }

        return ResponseEntity.ok(ApiResponse.success("Data exported", dataExportService.exportUserData(userId)));
    }
}