package com.insurai.platform.controller;

import com.insurai.platform.dto.request.AppointmentRequestDTO;
import com.insurai.platform.dto.request.AppointmentStatusUpdateDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.AppointmentResponseDTO;
import com.insurai.platform.entity.AppointmentStatus;
import com.insurai.platform.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;

    @PostMapping("/book")
    public ResponseEntity<ApiResponse<AppointmentResponseDTO>> book(
            @Valid @RequestBody AppointmentRequestDTO requestDto,
            Authentication authentication) {

        AppointmentResponseDTO response = appointmentService.bookAppointment(authentication.getName(), requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Appointment requested successfully", response));
    }

    @GetMapping("/my")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> myAppointments(Authentication authentication) {
        List<AppointmentResponseDTO> response = appointmentService.getMyAppointments(authentication.getName());
        return ResponseEntity.ok(ApiResponse.success("Appointments fetched", response));
    }

    @GetMapping("/admin/all")
    public ResponseEntity<ApiResponse<List<AppointmentResponseDTO>>> allAppointments(
            @RequestParam(required = false) AppointmentStatus status) {

        List<AppointmentResponseDTO> response = appointmentService.getAllAppointments(status);
        return ResponseEntity.ok(ApiResponse.success("Appointments fetched", response));
    }

    @PatchMapping("/admin/{id}/status")
    public ResponseEntity<ApiResponse<AppointmentResponseDTO>> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentStatusUpdateDTO requestDto) {

        AppointmentResponseDTO response = appointmentService.updateStatus(id, requestDto);
        return ResponseEntity.ok(ApiResponse.success("Appointment status updated", response));
    }
}