package com.insurai.platform.repository;

import com.insurai.platform.entity.ApplicationStatus;
import com.insurai.platform.entity.PolicyApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyApplicationRepository extends JpaRepository<PolicyApplication, Long> {

    List<PolicyApplication> findByUser_EmailOrderByAppliedAtDesc(String email);

    List<PolicyApplication> findByStatusOrderByAppliedAtDesc(ApplicationStatus status);

    List<PolicyApplication> findAllByOrderByAppliedAtDesc();

    boolean existsByUser_EmailAndPolicy_IdAndStatus(String email, Long policyId, ApplicationStatus status);
}