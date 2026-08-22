package com.insurai.platform.repository;

import com.insurai.platform.entity.InsuranceCategory;
import com.insurai.platform.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    List<Policy> findByCategoryAndIsActiveTrue(InsuranceCategory category);
    List<Policy> findAllByIsActiveTrue();
}