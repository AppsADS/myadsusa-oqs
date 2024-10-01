package com.oqs.calculator.config;

import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;

@Component
public class StageInitializer {

    @PostConstruct
    public void init() {
        // Perform any initialization logic here if needed
        // Since stages are already in the data.sql, no need to handle stages here
    }
}
