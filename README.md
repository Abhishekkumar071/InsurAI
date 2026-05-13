# 🧠 InsurAI – Smart Insurance Management Platform

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

> A full-stack, web-based insurance platform designed to digitalize, simplify, and automate the traditional insurance process.

---

<details>
<summary><b>📖 Table of Contents</b></summary>

- [About The Project](#about-the-project)
- [Key Features](#key-features)
- [System Architecture & Workflow](#system-architecture--workflow)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Getting Started (Installation)](#getting-started)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Project Insights](#project-insights)
- [Future Scope](#future-scope)
- [License & Contact](#license--contact)

</details>

---

## 🔷 About The Project

Traditional insurance systems are often bogged down by manual paperwork, slow approvals, lack of user transparency, and high dependency on agents. **InsurAI** is engineered to solve these bottlenecks by providing a centralized, digital, and automated ecosystem. 

It empowers users to seamlessly discover, compare, and apply for insurance policies while outfitting admins and agents with a secure, efficient dashboard to manage policies and track applications.

**Core Objectives:**
* Simplify insurance policy discovery.
* Enable quick, secure online applications.
* Automate admin approval workflows.
* Maintain 100% transparent application status tracking.
* Lay a robust architectural foundation for future Generative AI and LLM integrations.

---

## 🔷 Key Features

### 👤 User Portal
* **Secure Authentication:** Register and log in securely.
* **Policy Discovery:** Browse insurance categories, compare plans, and view deep details (premium, benefits, terms).
* **Seamless Applications:** Apply for insurance plans directly through the platform.
* **Live Tracking:** Monitor application status in real-time (Pending / Approved / Rejected).
* ***Upcoming:*** Premium payment gateway integration.

### 🛠️ Admin / Agent Dashboard
* **Secure Access:** Role-based login for administrative control.
* **Policy Management:** Add, update, delete, and manage the availability of insurance policies.
* **Application Workflow:** View all incoming user applications and efficiently approve or reject requests.

---

## 🔷 System Architecture & Workflow

InsurAI follows a modern, decoupled architecture ensuring scalability and smooth data flow between the client and server.

```mermaid
graph TD
    A[React Frontend] -->|REST API Calls| B(Spring Boot Backend)
    B -->|JPA / Hibernate| C[(MySQL Database)]
    B -->|JWT Authentication| D{Spring Security}
    
    subgraph User Flow
    U1[Browse Policies] --> U2[Log In / Register]
    U2 --> U3[Apply for Policy]
    U3 --> U4[Track Status]
    end
    
    subgraph Admin Flow
    A1[Log In] --> A2[Manage Policies]
    A1 --> A3[Review Applications]
    A3 -->|Approve/Reject| U4
    end
