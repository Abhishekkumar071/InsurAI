package com.insurai.platform.service.impl;

import com.insurai.platform.service.EmailService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    @Async("emailTaskExecutor")
    public void sendApplicationStatusEmail(String toEmail, String userName, String policyName, String status, String remarks) {
        try {
            String subject = "Your InsurAI application is " + status;
            StringBuilder body = new StringBuilder();
            body.append("Hi ").append(userName).append(",\n\n");
            body.append("Your application for \"").append(policyName).append("\" has been ").append(status.toLowerCase()).append(".\n");
            if (remarks != null && !remarks.isBlank()) {
                body.append("Note from our team: ").append(remarks).append("\n");
            }
            body.append("\nLog in to InsurAI to view details.\n\n— Team InsurAI");

            sendEmail(toEmail, subject, body.toString());
        } catch (Exception e) {
            log.error("Failed to send application status email to {}: {}", toEmail, e.getMessage());
        }
    }

    @Override
    @Async("emailTaskExecutor")
    public void sendPaymentSuccessEmail(String toEmail, String userName, String policyName, String amount) {
        try {
            String subject = "Payment Received — Your policy is now active";
            String body = "Hi " + userName + ",\n\n"
                    + "We've received your premium payment of ₹" + amount + " for \"" + policyName + "\".\n"
                    + "Your policy is now ACTIVE.\n\n"
                    + "Thank you for choosing InsurAI.\n\n— Team InsurAI";

            sendEmail(toEmail, subject, body);
        } catch (Exception e) {
            log.error("Failed to send payment success email to {}: {}", toEmail, e.getMessage());
        }
    }

    private void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}