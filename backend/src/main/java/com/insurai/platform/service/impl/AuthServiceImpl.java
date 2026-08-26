package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.LoginRequestDTO;
import com.insurai.platform.dto.request.RegisterRequestDTO;
import com.insurai.platform.dto.response.AuthResponseDTO;
import com.insurai.platform.entity.Users;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.exception.DuplicateResourceException;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.security.JwtUtil;
import com.insurai.platform.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + requestDto.getEmail());
        }

        Users user = Users.builder()
                .fullName(requestDto.getFullName())
                .email(requestDto.getEmail())
                .password(passwordEncoder.encode(requestDto.getPassword()))
                .role(Users.Role.USER)
                .build();

        Users saved = userRepository.save(user);
        String token = jwtUtil.generateToken(saved.getEmail(), saved.getRole().name());
        return mapToResponse(saved, token);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO requestDto) {
        Users user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(requestDto.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return mapToResponse(user, token);
    }

    private AuthResponseDTO mapToResponse(Users user, String token) {
        return AuthResponseDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .role(user.getRole())
                .token(token)
                .build();
    }
}