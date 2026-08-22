package com.insurai.platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "policies", indexes = {
        @Index(name = "idx_policy_category", columnList = "category"),
        @Index(name = "idx_policy_active", columnList = "is_active")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String policyName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private InsuranceCategory category;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal basePremium;

    @Column(nullable = false, precision = 14, scale = 2)
    private BigDecimal coverageAmount;

    @Column(nullable = false)
    private Integer tenureYears;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(columnDefinition = "TEXT")
    private String benefits;

    @Column(columnDefinition = "TEXT")
    private String termsAndConditions;

    @Builder.Default
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}