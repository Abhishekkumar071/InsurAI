package com.java.example.policy.dto;

import java.math.BigDecimal;

public class PolicyDto {

	private Long id;
    private String name;
    private BigDecimal premium;
    private String category;
    private String description;
    private String benefits;
    private String terms;
    
    public PolicyDto() {}
    
    public PolicyDto(Long id, String name, BigDecimal premium, String category, 
            String description, String benefits, String terms) {
    	
    	this.id = id;
        this.name = name;
        this.premium = premium;
        this.category = category;
        this.description = description;
        this.benefits = benefits;
        this.terms = terms;
        
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public BigDecimal getPremium() {
        return premium;
    }
    public void setPremium(BigDecimal premium) {
        this.premium = premium;
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
    
    public String getTerms() {
        return terms;
    }
    public void setTerms(String terms) {
        this.terms = terms;
    }
}
