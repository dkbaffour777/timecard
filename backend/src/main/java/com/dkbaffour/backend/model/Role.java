package com.dkbaffour.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    // Predefined roles
    public static final String ADMIN = "ADMIN";
    public static final String USER = "USER";
}
