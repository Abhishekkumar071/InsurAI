package com.insurai.platform.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private Users user;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(length = 100)
    private String occupation;

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private IncomeBracket incomeBracket;

    @Builder.Default
    private Integer dependents = 0;

    @Builder.Default
    private Boolean smoker = false;

    @Column(columnDefinition = "TEXT")
    private String existingHealthConditions;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public enum IncomeBracket {
        BELOW_3_LPA, LPA_3_TO_6, LPA_6_TO_10, LPA_10_TO_20, ABOVE_20_LPA
    }
}