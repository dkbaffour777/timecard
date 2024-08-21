package com.dkbaffour.backend.util;

import com.dkbaffour.backend.model.Role;
import com.dkbaffour.backend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
public class RoleInitializerUtil {

    @Autowired
    private RoleRepository roleRepository;

    @Bean
    public CommandLineRunner initializeRoles() {
        return args -> {
            if (roleRepository.findByName("ADMIN").isEmpty()) {
                Role adminRole = new Role();
                adminRole.setName("ADMIN");
                roleRepository.save(adminRole);
            }

            if (roleRepository.findByName("USER").isEmpty()) {
                Role userRole = new Role();
                userRole.setName("USER");
                roleRepository.save(userRole);
            }
        };
    }
}

