package com.java.example.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;




@Entity
@Table(name = "policies")

public class Policy {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyId;
    
    @Column(nullable = false)
    private String policyName;
    
    @Column(nullable = false)
    private BigDecimal premiumAmount;
    
    @Column(nullable = false)
    private String category;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String benefits;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String termsConditions;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
 // Constructors
    public Policy() {}
    
    public Policy(String policyName, BigDecimal premiumAmount, String category, 
                  String description, String benefits, String termsConditions) {
        this.policyName = policyName;
        this.premiumAmount = premiumAmount;
        this.category = category;
        this.description = description;
        this.benefits = benefits;
        this.termsConditions = termsConditions;
    }
    
 // Getters and Setters
    public Long getPolicyId() {
        return policyId;
    }
    
    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }
    
    public String getPolicyName() {
        return policyName;
    }
    
    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }
    
    public BigDecimal getPremiumAmount() {
        return premiumAmount;
    }
    
    public void setPremiumAmount(BigDecimal premiumAmount) {
        this.premiumAmount = premiumAmount;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getBenefits() {
        return benefits;
    }
    
    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }
    
    public String getTermsConditions() {
        return termsConditions;
    }
    public void setTermsConditions(String termsConditions) {
        this.termsConditions = termsConditions;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
}
