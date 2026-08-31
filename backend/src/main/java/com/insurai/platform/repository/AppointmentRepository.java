package com.insurai.platform.repository;

import com.insurai.platform.entity.Appointment;
import com.insurai.platform.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByUser_EmailOrderByCreatedAtDesc(String email);
    List<Appointment> findByStatusOrderByCreatedAtDesc(AppointmentStatus status);
    List<Appointment> findAllByOrderByCreatedAtDesc();
}