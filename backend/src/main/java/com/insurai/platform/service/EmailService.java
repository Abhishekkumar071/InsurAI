package com.insurai.platform.service;

public interface EmailService {
    void sendApplicationStatusEmail(String toEmail, String userName, String policyName, String status, String remarks);
    void sendPaymentSuccessEmail(String toEmail, String userName, String policyName, String amount);
}