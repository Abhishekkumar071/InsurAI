package com.insurai.platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private PolicyApplication application;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private DocumentType documentType;

    @Column(nullable = false)
    private String originalFileName;

    @Column(nullable = false)
    private String storedFilePath;

    @Column(nullable = false)
    private String contentType;

    @Column(nullable = false)
    private Long fileSizeBytes;

    @Builder.Default
    @Column(nullable = false)
    private Boolean verified = false;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime uploadedAt;
}