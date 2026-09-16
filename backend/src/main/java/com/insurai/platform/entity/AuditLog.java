package com.insurai.platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs", indexes = {
        @Index(name = "idx_audit_entity", columnList = "entity_type, entity_id"),
        @Index(name = "idx_audit_performed_by", columnList = "performed_by")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entity_type", nullable = false, updatable = false, length = 50)
    private String entityType;   // e.g. "POLICY_APPLICATION", "POLICY", "DOCUMENT"

    @Column(name = "entity_id", nullable = false, updatable = false)
    private Long entityId;

    @Column(nullable = false, updatable = false, length = 50)
    private String action;       // e.g. "APPROVED", "REJECTED", "DEACTIVATED", "VERIFIED"

    @Column(name = "performed_by", nullable = false, updatable = false)
    private String performedBy;  // admin's email

    @Column(columnDefinition = "TEXT", updatable = false)
    private String details;      // free-text, e.g. remarks or old->new value

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime timestamp;
}