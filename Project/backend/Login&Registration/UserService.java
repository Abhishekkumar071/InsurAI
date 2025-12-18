package com.java.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.example.entity.Users;
import com.java.example.repositories.UserRepo;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    // Register new user
    public String registerUser(Users user) {
        Optional<Users> existing = userRepo.findByEmail(user.getEmail());
        if (existing.isPresent()) {
            return "Email already exists!";
        }
        if(user.getRole() == null || user.getRole().isEmpty()) {
        	user.setRole("USER");
        }
        userRepo.save(user);
        return "User registered successfully!";
    }

    // Validate login
    public Users validateUser(String email, String password) {
        Optional<Users> existing = userRepo.findByEmail(email);
        if (existing.isPresent()) {
            Users user = existing.get();
            if (user.getPassword().equals(password)) {
                return user; // Return user object with role
            }
        }
        return null;
    }
}
