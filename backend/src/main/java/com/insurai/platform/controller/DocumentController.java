package com.insurai.platform.controller;

import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.DocumentResponseDTO;
import com.insurai.platform.entity.DocumentType;
import com.insurai.platform.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/documents")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService documentService;

    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<DocumentResponseDTO>> upload(
            @RequestParam Long applicationId,
            @RequestParam DocumentType documentType,
            @RequestParam("file") MultipartFile file,
            Authentication authentication) {

        DocumentResponseDTO response = documentService.uploadDocument(
                authentication.getName(), applicationId, documentType, file);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Document uploaded successfully", response));
    }

    @GetMapping("/my/application/{applicationId}")
    public ResponseEntity<ApiResponse<List<DocumentResponseDTO>>> myDocuments(
            @PathVariable Long applicationId, Authentication authentication) {

        List<DocumentResponseDTO> response =
                documentService.getDocumentsForApplication(authentication.getName(), applicationId, false);
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", response));
    }

    @GetMapping("/admin/application/{applicationId}")
    public ResponseEntity<ApiResponse<List<DocumentResponseDTO>>> adminDocuments(
            @PathVariable Long applicationId, Authentication authentication) {

        List<DocumentResponseDTO> response =
                documentService.getDocumentsForApplication(authentication.getName(), applicationId, true);
        return ResponseEntity.ok(ApiResponse.success("Documents fetched", response));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Long id) {
        Resource resource = documentService.downloadDocument(id);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @PatchMapping("/admin/{id}/verify")
    public ResponseEntity<ApiResponse<DocumentResponseDTO>> verify(@PathVariable Long id) {
        DocumentResponseDTO response = documentService.verifyDocument(id);
        return ResponseEntity.ok(ApiResponse.success("Document verified", response));
    }
}