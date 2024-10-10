package com.oqs.calculator.config;

import org.springframework.stereotype.Component;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;

@Component
public class CustomCorsFilter implements Filter {

    @Override
    public void doFilter(javax.servlet.ServletRequest request, javax.servlet.ServletResponse response, FilterChain chain)
            throws IOException, javax.servlet.ServletException {

        HttpServletResponse res = (HttpServletResponse) response;
        // No CORS headers, effectively disabling CORS
        res.setHeader("Access-Control-Allow-Origin", "");
        res.setHeader("Access-Control-Allow-Methods", "");
        res.setHeader("Access-Control-Allow-Headers", "");

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) throws javax.servlet.ServletException { }

    @Override
    public void destroy() { }
}
