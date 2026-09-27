package com.insurai.platform.dto.request;

import com.insurai.platform.entity.UserProfile;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserProfileRequestDTO {

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private String occupation;

    @NotNull(message = "Income bracket is required")
    private UserProfile.IncomeBracket incomeBracket;

    @Min(value = 0, message = "Dependents cannot be negative")
    @Max(value = 20, message = "Dependents value seems invalid")
    private Integer dependents;

    @NotNull(message = "Smoker status is required")
    private Boolean smoker;

    private String existingHealthConditions;
}