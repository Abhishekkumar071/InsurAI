package com.insurai.platform.service.impl;

import com.insurai.platform.dto.request.LoginRequestDTO;
import com.insurai.platform.dto.request.RegisterRequestDTO;
import com.insurai.platform.dto.response.AuthResponseDTO;
import com.insurai.platform.entity.Users;
import com.insurai.platform.exception.BadRequestException;
import com.insurai.platform.exception.DuplicateResourceException;
import com.insurai.platform.repository.UserRepository;
import com.insurai.platform.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO requestDto) {
        if (userRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateResourceException("Email already registered: " + requestDto.getEmail());
        }

        Users user = Users.builder()
                .fullName(requestDto.getFullName())
                .email(requestDto.getEmail())
                .password(requestDto.getPassword())   // TODO Step 3: BCrypt encode
                .role(Users.Role.USER)
                .build();

        Users saved = userRepository.save(user);
        return mapToResponse(saved, null);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO requestDto) {
        Users user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!user.getPassword().equals(requestDto.getPassword())) {   // TODO Step 3: BCrypt matches()
            throw new BadRequestException("Invalid email or password");
        }

        return mapToResponse(user, null);   // token Step 3 mein aayega
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