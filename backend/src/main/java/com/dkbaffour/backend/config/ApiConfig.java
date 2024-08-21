package com.dkbaffour.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ApiConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")  // Ensure this matches your frontend URL exactly
                .allowedMethods("*")  // Allow all methods
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
