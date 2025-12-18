package com.java.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;   
import org.springframework.web.bind.annotation.*;

import com.java.example.entity.Users;
import com.java.example.logindto.LoginDto;
import com.java.example.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user) {
        String result = userService.registerUser(user);
        if ("User registered successfully!".equals(result)) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(result);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        Users user = userService.validateUser(loginDto.getEmail(), loginDto.getPassword());
        if (user != null) {
            // You can generate a token here if needed (for now, dummy token)
            LoginDto response = new LoginDto();
            response.setEmail(user.getEmail());
            response.setName(user.getName());
            response.setRole(user.getRole());
            response.setToken("dummy-token"); // Replace with JWT or real token logic if needed
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials!");
        }
    }
}
