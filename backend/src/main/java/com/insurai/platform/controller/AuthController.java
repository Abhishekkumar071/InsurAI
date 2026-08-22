package com.insurai.platform.controller;

import com.insurai.platform.dto.request.LoginRequestDTO;
import com.insurai.platform.dto.request.RegisterRequestDTO;
import com.insurai.platform.dto.response.ApiResponse;
import com.insurai.platform.dto.response.AuthResponseDTO;
import com.insurai.platform.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> register(@Valid @RequestBody RegisterRequestDTO requestDto) {
        AuthResponseDTO response = authService.register(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@Valid @RequestBody LoginRequestDTO requestDto) {
        AuthResponseDTO response = authService.login(requestDto);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
}