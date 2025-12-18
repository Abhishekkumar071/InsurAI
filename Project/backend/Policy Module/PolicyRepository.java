package com.java.example.policy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.java.example.entity.Policy;

import java.util.List;

@Repository
public interface PolicyRepository extends JpaRepository<Policy, Long> {
    List<Policy> findByCategory(String category);
    List<Policy> findByPolicyNameContainingIgnoreCase(String policyName);
}
