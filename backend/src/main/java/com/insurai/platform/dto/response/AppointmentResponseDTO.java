package com.insurai.platform.dto.response;

import com.insurai.platform.entity.AppointmentStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
public class AppointmentResponseDTO {
    private Long id;
    private Long userId;
    private String userFullName;
    private String userEmail;
    private Long policyId;          // null ho sakta hai
    private String policyName;      // null ho sakta hai
    private LocalDate preferredDate;
    private LocalTime preferredTime;
    private String reason;
    private AppointmentStatus status;
    private String agentNotes;
    private LocalDateTime createdAt;
}