package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.AppointmentRequestDTO;
import com.insurai.platform.dto.request.AppointmentStatusUpdateDTO;
import com.insurai.platform.dto.response.AppointmentResponseDTO;
import com.insurai.platform.entity.Appointment;
import com.insurai.platform.entity.Policy;
import com.insurai.platform.entity.AppointmentStatus;
import com.insurai.platform.entity.Users;
import com.insurai.platform.exception.ResourceNotFoundException;
import com.insurai.platform.repository.AppointmentRepository;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final PolicyRepository policyRepository;

    @Override
    @Transactional
    public AppointmentResponseDTO bookAppointment(String email, AppointmentRequestDTO requestDto) {
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));

        Policy policy = Optional.ofNullable(requestDto.getPolicyId())
                .map(id -> policyRepository.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("Policy not found with ID: " + id)))
                .orElse(null);

        Appointment appointment = Appointment.builder()
                .user(user)
                .policy(policy)
                .preferredDate(requestDto.getPreferredDate())
                .preferredTime(requestDto.getPreferredTime())
                .reason(requestDto.getReason())
                .status(AppointmentStatus.REQUESTED)
                .build();

        return mapToResponse(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentResponseDTO> getMyAppointments(String email) {
        return appointmentRepository.findByUser_EmailOrderByCreatedAtDesc(email)
                .stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public List<AppointmentResponseDTO> getAllAppointments(AppointmentStatus statusFilter) {
        List<Appointment> appointments = (statusFilter != null)
                ? appointmentRepository.findByStatusOrderByCreatedAtDesc(statusFilter)
                : appointmentRepository.findAllByOrderByCreatedAtDesc();

        return appointments.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public AppointmentResponseDTO updateStatus(Long appointmentId, AppointmentStatusUpdateDTO requestDto) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with ID: " + appointmentId));

        appointment.setStatus(requestDto.getStatus());
        if (requestDto.getAgentNotes() != null) {
            appointment.setAgentNotes(requestDto.getAgentNotes());
        }

        return mapToResponse(appointmentRepository.save(appointment));
    }

    private AppointmentResponseDTO mapToResponse(Appointment appt) {
        return AppointmentResponseDTO.builder()
                .id(appt.getId())
                .userId(appt.getUser().getId())
                .userFullName(appt.getUser().getFullName())
                .userEmail(appt.getUser().getEmail())
                .policyId(appt.getPolicy() != null ? appt.getPolicy().getId() : null)
                .policyName(appt.getPolicy() != null ? appt.getPolicy().getPolicyName() : null)
                .preferredDate(appt.getPreferredDate())
                .preferredTime(appt.getPreferredTime())
                .reason(appt.getReason())
                .status(appt.getStatus())
                .agentNotes(appt.getAgentNotes())
                .createdAt(appt.getCreatedAt())
                .build();
    }
}