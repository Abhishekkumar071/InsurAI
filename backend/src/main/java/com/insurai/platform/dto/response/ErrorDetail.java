package com.insurai.platform.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDetail {
    private String field;   // null rahega agar field-specific nahi hai
    private String message;
}