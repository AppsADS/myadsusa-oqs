package com.oqs.calculator.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {
    @GetMapping("/")
    public String home() {
        return "API is running";
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Health check OK!";
    }

}


