package com.insurai.platform.repository;

import com.insurai.platform.entity.Payment;
import com.insurai.platform.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByRazorpayOrderId(String razorpayOrderId);
    boolean existsByApplication_IdAndStatus(Long applicationId, PaymentStatus status);
}