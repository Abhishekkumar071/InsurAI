🧠 InsurAI – Smart Insurance Management Platform
🔷 What is InsurAI?

InsurAI is a full-stack web-based insurance platform designed to digitalize and automate the traditional insurance process.
It allows users to discover, compare, and apply for insurance policies online, while enabling admins/agents to manage policies and applications efficiently through a secure dashboard.

The platform is built using React (Frontend), Spring Boot (Backend), and MySQL (Database), following industry-standard architecture and security practices.

🔷 Why InsurAI? (Problem Statement)

Traditional insurance systems face several issues:

Manual paperwork and slow approval processes

Difficulty in comparing policies

Lack of transparency for users

High dependency on agents for basic tasks

Inefficient tracking of applications

InsurAI solves these problems by providing a centralized, digital, and automated insurance solution.

🔷 Project Objectives

Simplify insurance policy discovery

Enable quick and secure online applications

Automate admin approval workflows

Maintain transparent application status tracking

Reduce manual effort and delays

Prepare a foundation for future AI integration

🔷 User Roles in InsurAI
👤 User

Register and log in securely

View insurance categories and policies

See policy details: premium, benefits, terms

Apply for insurance plans

Track application status (Pending / Approved / Rejected)

Pay premium after approval (future scope)

🛠️ Admin / Agent
<img width="576" height="738" alt="agent" src="https://github.com/user-attachments/assets/b71824d7-8a91-454b-bbc1-9d6e8096d4ab" />

Secure admin login

Add, update, and delete insurance policies

View all user applications

Approve or reject applications

Manage policy availability on the platform

🔷 System Workflow
🧑‍💻 User Flow
<img width="574" height="712" alt="user" src="https://github.com/user-attachments/assets/e591294e-e51d-4771-8363-992c35acadb1" />

User visits Home Page

Browses insurance categories

Views policy details

Logs in / Registers

Applies for policy

Application marked as Pending

Admin reviews application

Status updated to Approved / Rejected

User proceeds to payment (future scope)

🛠️ Admin Flow

Admin logs in

Adds insurance policies

Policies stored in MySQL

Reviews user applications

Approves or rejects requests

Status reflected to users

🔷 Technology Stack
Frontend

React.js

Axios (API calls)

HTML, CSS, JavaScript

Backend

Spring Boot

RESTful APIs

Spring Data JPA

JWT Authentication

Database

MySQL

Tools

Spring Tool Suite 4

VS Code

Postman

Git & GitHub

🔷 Architecture Overview
React Frontend
     ↓
Spring Boot REST APIs
     ↓
MySQL Database


Frontend handles UI and user interactions

Backend manages business logic and security

Database stores users, policies, and applications

🔷 Database Entities

User – stores login and role details

Policy – stores insurance policy data

Application – tracks user applications and status

🔷 Security Implementation

JWT-based authentication

Role-based access control (User / Admin)

Backend validation for all inputs

Secure REST endpoints

🔷 Challenges Faced

React and Spring Boot integration

DTO–Entity mapping errors

JWT token handling

Role-based access implementation

Database relationship management

All challenges were resolved using debugging, Postman testing, and mentor guidance.

🔷 Learnings & Outcomes

Full-stack application development

REST API design and integration

Secure authentication mechanisms

Database schema design

Real-world software architecture

Team collaboration and documentation

🔷 Future Scope of InsurAI

AI-based policy recommendation system

Smart chatbot for insurance queries

Fraud detection and risk scoring

Online payment gateway integration

Claims management module

Analytics dashboards

Mobile application (Android/iOS)

Multi-language support

🔷 Real-World Impact

Faster insurance onboarding

Reduced paperwork

Improved transparency

Better user experience

Increased operational efficiency for agents

🔷 Conclusion

InsurAI demonstrates how modern full-stack technologies can transform the insurance industry by making processes faster, smarter, and more user-friendly.
This project provided hands-on experience in building a real-world application and strengthened our foundation in software engineering.
