# InsurAI Backend - Local Development Setup

## Overview
This guide explains how to set up and run the InsurAI backend application on your local machine using MySQL database.

## Prerequisites

### Required Software
- **Java 21** (JDK)
- **MySQL 8.0+** (Must be running locally)
- **Maven 3.8+** (or use embedded mvnw)

### Environment Setup

1. **Install Java 21**
   ```bash
   # Verify Java installation
   java -version
   ```

2. **Install MySQL**
   ```bash
   # Windows (Chocolatey)
   choco install mysql

   # macOS (Homebrew)
   brew install mysql

   # Linux (Ubuntu/Debian)
   sudo apt-get install mysql-server
   ```

3. **Start MySQL Service**
   ```bash
   # Windows
   net start MySQL80

   # macOS/Linux
   sudo service mysql start
   ```

## Database Setup

### 1. Create Database and User

```sql
-- Login to MySQL (default root user has no password initially)
mysql -u root -p

-- Create database
CREATE DATABASE insurai_db;

-- Create application user (optional, or use root)
CREATE USER 'insurai_user'@'localhost' IDENTIFIED BY 'insurai_password';
GRANT ALL PRIVILEGES ON insurai_db.* TO 'insurai_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
```

### 2. Verify Connection
```sql
mysql -u root -p insurai_db
```

## Environment Variables Configuration

### 1. Copy .env.example to .env

```bash
cp .env.example .env
```

### 2. Configure .env for Local Development

Update `.env` file with your local database credentials:

```env
# ============================================================
# LOCAL DATABASE CONFIGURATION (MySQL)
# ============================================================
DB_HOST=localhost
DB_PORT=3306
DB_NAME=insurai_db
DB_USERNAME=root
DB_PASSWORD=test123  # Change this to your MySQL password

# JWT Configuration (Keep as-is for local dev, or customize)
JWT_SECRET=c29tZVN1cGVyU2VjcmV0S2V5VGhhdElzTG9uZ0Vub3VnaEZvckhTMjU2QWxnb3JpdGht
JWT_EXPIRATION_MS=86400000

# Mail Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password  # Use Gmail App Password, not regular password

# Razorpay Configuration (Test credentials)
RAZORPAY_KEY_ID=rzp_test_TW6VxZoZ26UhvN
RAZORPAY_KEY_SECRET=oeJc74k9SFwqwdmzAzEIuxjW

# Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key
GEMINI_MODEL=gemini-3.6-flash

# File Upload Configuration
FILE_UPLOAD_DIR=./uploads/documents

# Server Configuration
SERVER_PORT=8080
```

**Important Notes:**
- Never commit `.env` file to version control (already in .gitignore)
- For Gmail: Enable "Less secure app access" or use App Passwords
- Razorpay credentials above are test keys (safe to use locally)

## Running the Application

### Option 1: Using Maven Wrapper (Recommended)

```bash
# Windows
mvnw spring-boot:run

# macOS/Linux
./mvnw spring-boot:run
```

### Option 2: Using System Maven

```bash
mvn spring-boot:run
```

### Option 3: Build JAR and Run

```bash
# Build
mvn clean package

# Run (JAR configuration is commented out, but structure is available)
java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Verify Application is Running

### Check API Endpoint

```bash
# Test if server is running
curl http://localhost:8080/health

# Access Swagger/OpenAPI documentation
# Open browser: http://localhost:8080/swagger-ui.html
```

### Check Database Connection

```bash
# The application will auto-create tables via Hibernate DDL
# Verify in MySQL:
mysql -u root -p insurai_db -e "SHOW TABLES;"
```

## Application Features

### Available Endpoints

- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **API Docs**: `http://localhost:8080/v3/api-docs`
- **Health Check**: `http://localhost:8080/health`

### Default Profiles

- **Local Development**: `application.yaml` + `application-local.properties`
- **Production**: `application-prod.properties` (AWS RDS - Commented out)

## Stopping the Application

Press `Ctrl + C` in the terminal

## Troubleshooting

### Issue: MySQL Connection Failed
```
Error: Communications link failure
```
**Solution:**
- Verify MySQL is running: `mysql -u root -p`
- Check DB_HOST, DB_PORT in .env
- Ensure database exists: `CREATE DATABASE insurai_db;`

### Issue: Port 8080 Already in Use
```
Error: Address already in use
```
**Solution:**
- Change SERVER_PORT in .env to a different port (e.g., 8081)
- Or kill existing process using port 8080

### Issue: Mail Configuration Error
```
Error: Failed to send mail
```
**Solution:**
- For Gmail: Use App Password instead of account password
- Verify MAIL_USERNAME and MAIL_PASSWORD in .env
- Enable "Less secure app access" in Gmail account

### Issue: Upload Directory Permission Denied
```
Error: Could not create upload directory
```
**Solution:**
- Ensure ./uploads/documents directory is writable
- Create manually: `mkdir -p ./uploads/documents`

## File Structure

```
backend/
├── .env                              # Local environment variables (NOT committed)
├── .env.example                      # Template for .env
├── pom.xml                           # Maven configuration
├── src/
│   └── main/
│       ├── java/com/insurai/platform/
│       │   ├── BackendApplication.java
│       │   ├── config/              # Configuration classes
│       │   │   ├── SecurityConfig.java
│       │   │   ├── RazorpayConfig.java
│       │   │   ├── GeminiConfig.java
│       │   │   └── ...
│       │   └── ...
│       └── resources/
│           ├── application.yaml      # Main configuration
│           ├── application-local.properties
│           └── application-prod.properties  # AWS config (commented)
└── LOCAL_SETUP.md                    # This file
```

## Next Steps

1. ✅ Install Java 21 and MySQL
2. ✅ Configure .env file
3. ✅ Run the application
4. ✅ Access Swagger UI at `http://localhost:8080/swagger-ui.html`
5. ✅ Start developing!

## Additional Resources

- **Spring Boot Documentation**: https://spring.io/projects/spring-boot
- **Spring Security**: https://spring.io/projects/spring-security
- **Spring Data JPA**: https://spring.io/projects/spring-data-jpa
- **MySQL Documentation**: https://dev.mysql.com/doc/
- **JWT Guide**: https://jwt.io/

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review application logs in console
3. Verify .env configuration
4. Check MySQL connection
