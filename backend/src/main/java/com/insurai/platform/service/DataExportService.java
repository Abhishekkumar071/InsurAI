package com.insurai.platform.service;

import com.insurai.platform.dto.response.DataExportResponseDTO;

public interface DataExportService {
    DataExportResponseDTO exportUserData(Long userId);
}