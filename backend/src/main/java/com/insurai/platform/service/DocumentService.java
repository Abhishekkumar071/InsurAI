package com.insurai.platform.service;

import com.insurai.platform.dto.response.DocumentResponseDTO;
import com.insurai.platform.entity.DocumentType;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DocumentService {
    DocumentResponseDTO uploadDocument(String email, Long applicationId, DocumentType type, MultipartFile file);
    List<DocumentResponseDTO> getDocumentsForApplication(String email, Long applicationId, boolean isAdmin);
    Resource downloadDocument(Long documentId);
    DocumentResponseDTO verifyDocument(Long documentId);
}