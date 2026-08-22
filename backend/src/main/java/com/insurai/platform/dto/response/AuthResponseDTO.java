package com.insurai.platform.dto.response;

import com.insurai.platform.entity.Users;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponseDTO {
    private Long id;
    private String fullName;
    private String email;
    private Users.Role role;
    private String token;   // Step 3 mein populate hoga
}