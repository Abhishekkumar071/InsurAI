package com.insurai.platform.service;

import com.insurai.platform.dto.request.LoginRequestDTO;
import com.insurai.platform.dto.request.RegisterRequestDTO;
import com.insurai.platform.dto.response.AuthResponseDTO;

public interface AuthService {
    AuthResponseDTO register(RegisterRequestDTO requestDto);
    AuthResponseDTO login(LoginRequestDTO requestDto);
}