package com.dkbaffour.backend.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CompanyDTO {
    private Long id;
    private String name;
    private String domain;
    private LocalDateTime createdAt;

    // Getters and Setters

}
