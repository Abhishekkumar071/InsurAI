package com.insurai.platform.service;

import com.insurai.platform.dto.request.AppointmentRequestDTO;
import com.insurai.platform.dto.request.AppointmentStatusUpdateDTO;
import com.insurai.platform.dto.response.AppointmentResponseDTO;
import com.insurai.platform.entity.AppointmentStatus;

import java.util.List;

public interface AppointmentService {
    AppointmentResponseDTO bookAppointment(String email, AppointmentRequestDTO requestDto);
    List<AppointmentResponseDTO> getMyAppointments(String email);
    List<AppointmentResponseDTO> getAllAppointments(AppointmentStatus statusFilter);
    AppointmentResponseDTO updateStatus(Long appointmentId, AppointmentStatusUpdateDTO requestDto);
}