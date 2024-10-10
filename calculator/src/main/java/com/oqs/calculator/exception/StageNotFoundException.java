package com.oqs.calculator.exception;

public class StageNotFoundException extends RuntimeException {
    public StageNotFoundException(Long id) {
        super("Stage with ID " + id + " not found");
    }
}
