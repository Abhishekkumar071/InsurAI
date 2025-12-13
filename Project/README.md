🧠 InsurAI – Smart Insurance Management Platform

InsurAI is a full-stack web-based insurance platform that enables users to discover, compare, and apply for insurance policies digitally. The system also provides an admin dashboard for managing policies and reviewing user applications.
The project is built using React, Spring Boot, and MySQL, following real-world industry practices.

📌 Project Overview

Traditional insurance systems involve manual paperwork, delayed approvals, and poor transparency. InsurAI solves these issues by providing:

A centralized digital insurance platform

Easy policy discovery and application process

Secure user authentication

Admin-controlled approval workflows

Scalable architecture for future AI integration

This project was developed as part of the Infosys Springboard Virtual Internship 6.0.

🎯 Objectives

Simplify insurance policy discovery for users

Automate application and approval workflows

Provide secure role-based access (User/Admin)

Store and manage data efficiently using MySQL

Prepare a foundation for AI-based recommendations

👥 User Roles & Features
👤 User

Register and login securely

Browse insurance policies by category

View policy details (premium, benefits, terms)

Apply for insurance policies

Track application status (Pending / Approved / Rejected)

Pay premium after approval (planned extension)

🛠️ Admin

Secure admin login

Add, update, and delete insurance policies

View user applications

Approve or reject policy applications

Manage policy visibility on the home page

🔄 Application Workflow
User Registration/Login
        ↓
Browse Policies
        ↓
Apply for Policy
        ↓
Application Status: Pending
        ↓
Admin Review
   ↓          ↓
Approved   Rejected
   ↓
Pay Premium (Future Scope)

🏗️ System Architecture
React Frontend
      ↓ (Axios / REST APIs)
Spring Boot Backend
      ↓ (JPA / Hibernate)
MySQL Database


Frontend handles UI and user interactions

Backend manages business logic and security

Database stores users, policies, and applications

🧰 Technology Stack
Frontend

React.js

Axios

HTML, CSS, JavaScript

Backend

Spring Boot

Spring Data JPA

RESTful APIs

JWT Authentication

Database

MySQL

Tools

Spring Tool Suite 4 (STS)

VS Code

Postman

Git & GitHub

🗃️ Database Design (Core Tables)

users – stores user and admin credentials

policies – stores insurance policy details

applications – stores user policy applications

🔐 Security Features

JWT-based authentication

Role-Based Access Control (User / Admin)

Backend validation for all requests

Secure API endpoints

🚀 How to Run the Project
Backend (Spring Boot)

Open project in Spring Tool Suite / IntelliJ

Configure MySQL credentials in application.properties

Run the Spring Boot application

Frontend (React)

Navigate to frontend folder

Install dependencies:

npm install


Start the app:

npm start

📸 Screenshots

(Add screenshots here)

Home Page

Login / Registration

Policy Listing

Admin Dashboard

Database Tables

⚠️ Challenges Faced

Integrating React with Spring Boot APIs

Handling DTO–Entity mapping

Implementing JWT authentication

Managing role-based access

These were resolved through debugging, API testing, and continuous learning.

📚 Learnings

Full-stack application development

REST API design and integration

Secure authentication mechanisms

Database schema design

Team collaboration and documentation

🔮 Future Enhancements

AI-based policy recommendation system

Chatbot for insurance queries

Online payment gateway integration

Claims management module

Mobile application (Android/iOS)

Analytics dashboard for admins

👨‍💻 Contributors

Team Members: (Add names here)

Mentor: Mr. Senthil Subramanian

Program: Infosys Springboard Virtual Internship 6.0

🙏 Acknowledgements

We thank Infosys Springboard and our mentor Mr. Senthil Subramanian for their guidance and support throughout this internship.
This project helped us gain valuable real-world development experience.

⭐ If you like this project

Please give it a ⭐ on GitHub and feel free to fork or contribute!
