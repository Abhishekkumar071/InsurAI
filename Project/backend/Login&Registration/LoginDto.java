package com.java.example.logindto;

public class LoginDto {
    private String token;
    private String email;
    private String name;
    private String role;
    private String password;
    public LoginDto() {}
    
    public LoginDto(String token, String email, String name, String role, String password) {
        this.token = token;
        this.email = email;
        this.name = name;
        this.role = role;
        this.password = password;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public String getPassword() {
    	return password;
    }
    public void setPassword(String password) {
    	this.password = password;
    }
}
