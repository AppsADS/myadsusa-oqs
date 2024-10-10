package com.oqs.calculator.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow CORS for all endpoints
                .allowedOrigins("https://myadsusa-oqs.vercel.app")  // Replace with your frontend URL, e.g., Vercel
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allowed HTTP methods
                .allowedHeaders("Content-Type", "Authorization", "X-Requested-With", "X-XSRF-TOKEN")  // Allow all headers
                .allowCredentials(true)  // Allow credentials if needed (e.g., cookies, auth)
                .maxAge(3600);  // Cache CORS preflight request for 1 hour
    }
}










