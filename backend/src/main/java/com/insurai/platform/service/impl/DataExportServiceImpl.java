package com.insurai.platform.service.impl;

import com.insurai.platform.dto.response.DataExportResponseDTO;
import com.insurai.platform.entity.ActionType;
import com.insurai.platform.entity.Policy;
import com.insurai.platform.entity.UserActivity;
import com.insurai.platform.entity.UserProfile;
import com.insurai.platform.repository.AppointmentRepository;
import com.insurai.platform.repository.PolicyRepository;
import com.insurai.platform.repository.UserActivityRepository;
import com.insurai.platform.repository.UserProfileRepository;
import com.insurai.platform.service.DataExportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DataExportServiceImpl implements DataExportService {

    private final UserProfileRepository userProfileRepository;
    private final UserActivityRepository userActivityRepository;
    private final PolicyRepository policyRepository;

    @Override
    public DataExportResponseDTO exportUserData(Long userId) {
        UserProfile profile = userProfileRepository.findByUser_Email(
                        userProfileRepository.findAll().stream()
                                .filter(p -> p.getUser().getId().equals(userId))
                                .findFirst()
                                .map(p -> p.getUser().getEmail())
                                .orElse(""))
                .orElse(null);

        Integer age = null;
        String incomeBracket = null;
        Integer dependents = null;
        Boolean smoker = null;

        if (profile != null) {
            age = Period.between(profile.getDateOfBirth(), LocalDate.now()).getYears();
            incomeBracket = profile.getIncomeBracket() != null ? profile.getIncomeBracket().name() : null;
            dependents = profile.getDependents();
            smoker = profile.getSmoker();
        }

        List<UserActivity> activities = userActivityRepository.findByUser_EmailOrderByTimestampDesc(
                profile != null ? profile.getUser().getEmail() : "");

        List<Long> viewedIds = activities.stream()
                .filter(a -> a.getActionType() == ActionType.VIEWED || a.getActionType() == ActionType.COMPARED)
                .map(a -> a.getPolicy().getId())
                .distinct()
                .collect(Collectors.toList());

        List<Long> appliedIds = activities.stream()
                .filter(a -> a.getActionType() == ActionType.APPLIED)
                .map(a -> a.getPolicy().getId())
                .distinct()
                .collect(Collectors.toList());

        List<Map<String, Object>> catalog = policyRepository.findAllByIsActiveTrue().stream()
                .map(this::policyToMap)
                .collect(Collectors.toList());

        return DataExportResponseDTO.builder()
                .userId(userId)
                .age(age)
                .incomeBracket(incomeBracket)
                .dependents(dependents)
                .smoker(smoker)
                .viewedPolicyIds(viewedIds)
                .appliedPolicyIds(appliedIds)
                .policyCatalog(catalog)
                .build();
    }

    private Map<String, Object> policyToMap(Policy p) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", p.getId());
        map.put("policyName", p.getPolicyName());
        map.put("category", p.getCategory().name());
        map.put("basePremium", p.getBasePremium());
        map.put("coverageAmount", p.getCoverageAmount());
        map.put("tenureYears", p.getTenureYears());
        return map;
    }
}