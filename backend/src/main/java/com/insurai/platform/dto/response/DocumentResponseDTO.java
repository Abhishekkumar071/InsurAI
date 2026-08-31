package com.insurai.platform.dto.response;

import com.insurai.platform.entity.DocumentType;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class DocumentResponseDTO {
    private Long id;
    private Long applicationId;
    private DocumentType documentType;
    private String originalFileName;
    private String contentType;
    private Long fileSizeBytes;
    private Boolean verified;
    private LocalDateTime uploadedAt;
}