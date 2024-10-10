package com.oqs.calculator.exception;

public class DealNotFoundException extends RuntimeException {
    public DealNotFoundException(Long id) {
        super("Deal with ID " + id + " not found");
    }
}
