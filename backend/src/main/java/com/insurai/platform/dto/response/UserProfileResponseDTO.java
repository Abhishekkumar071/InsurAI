package com.insurai.platform.dto.response;

import com.insurai.platform.entity.UserProfile;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class UserProfileResponseDTO {
    private Long id;
    private Long userId;
    private String fullName;
    private String email;
    private LocalDate dateOfBirth;
    private String occupation;
    private UserProfile.IncomeBracket incomeBracket;
    private Integer dependents;
    private Boolean smoker;
    private String existingHealthConditions;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}