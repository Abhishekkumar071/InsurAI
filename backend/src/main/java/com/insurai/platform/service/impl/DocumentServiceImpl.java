package com.insurai.platform.service.impl;

import com.insurai.platform.config.FileStorageConfig;
import com.insurai.platform.dto.response.DocumentResponseDTO;
import com.insurai.platform.entity.Document;
import com.insurai.platform.entity.DocumentType;
import com.insurai.platform.entity.PolicyApplication;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.DocumentRepository;
import com.insurai.platform.repository.PolicyApplicationRepository;
import com.insurai.platform.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private String resolveContentType(String extension) {
        return switch (extension) {
            case ".pdf" -> "application/pdf";
            case ".jpg", ".jpeg" -> "image/jpeg";
            case ".png" -> "image/png";
            default -> "application/octet-stream";
        };
    }


//    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
//            "application/pdf", "image/jpeg", "image/jpg", "image/png"
//    );
    private static final Set<String> ALLOWED_EXTENSIONS = Set.of(".pdf", ".jpg", ".jpeg", ".png");
    private static final long MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

    private final DocumentRepository documentRepository;
    private final PolicyApplicationRepository applicationRepository;
    private final FileStorageConfig fileStorageConfig;

    @Override
    @Transactional
    public DocumentResponseDTO uploadDocument(String email, Long applicationId, DocumentType type, MultipartFile file) {
        PolicyApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        if (!application.getUser().getEmail().equals(email)) {
            throw new BadRequestException("This application does not belong to you");
        }

        if (file.isEmpty()) {
            throw new BadRequestException("File cannot be empty");
        }
        if (file.getSize() > MAX_SIZE_BYTES) {
            throw new BadRequestException("File size must not exceed 5MB");
        }

        String extension = getExtension(file.getOriginalFilename()).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new BadRequestException("Only PDF, JPEG, and PNG files are allowed");
        }
        try {
            String storedFileName = UUID.randomUUID() + extension;

            Path applicationFolder = fileStorageConfig.getUploadPath().resolve(String.valueOf(applicationId));
            Files.createDirectories(applicationFolder);

            Path targetPath = applicationFolder.resolve(storedFileName);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            Document document = Document.builder()
                    .application(application)
                    .documentType(type)
                    .originalFileName(file.getOriginalFilename())
                    .storedFilePath(targetPath.toString())
                    .contentType(resolveContentType(extension))
                    .fileSizeBytes(file.getSize())
                    .verified(false)
                    .build();

            return mapToResponse(documentRepository.save(document));

        } catch (IOException e) {
            throw new BadRequestException("Failed to store file: " + e.getMessage());
        }
    }

    @Override
    public List<DocumentResponseDTO> getDocumentsForApplication(String email, Long applicationId, boolean isAdmin) {
        PolicyApplication application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));

        if (!isAdmin && !application.getUser().getEmail().equals(email)) {
            throw new BadRequestException("This application does not belong to you");
        }

        return documentRepository.findByApplication_Id(applicationId)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public Resource downloadDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID: " + documentId));
        try {
            Path filePath = Path.of(document.getStoredFilePath());
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new ResourceNotFoundException("File not found on server");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new BadRequestException("Invalid file path");
        }
    }

    @Override
    @Transactional
    public DocumentResponseDTO verifyDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException("Document not found with ID: " + documentId));
        document.setVerified(true);
        return mapToResponse(documentRepository.save(document));
    }

    private String getExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) return "";
        return fileName.substring(fileName.lastIndexOf("."));
    }

    private DocumentResponseDTO mapToResponse(Document doc) {
        return DocumentResponseDTO.builder()
                .id(doc.getId())
                .applicationId(doc.getApplication().getId())
                .documentType(doc.getDocumentType())
                .originalFileName(doc.getOriginalFileName())
                .contentType(doc.getContentType())
                .fileSizeBytes(doc.getFileSizeBytes())
                .verified(doc.getVerified())
                .uploadedAt(doc.getUploadedAt())
                .build();
    }
}