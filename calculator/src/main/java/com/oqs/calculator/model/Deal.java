package com.oqs.calculator.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Entity
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    private String name;

    @Min(value = 0, message = "Amount must be positive")
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "stage_id", nullable = false)  // Foreign key to Stage entity
    @NotNull(message = "Deal must have a stage")
    private Stage stage;

    // Constructors
    public Deal() {}

    public Deal(String name, Double amount, Stage stage) {
        this.name = name;
        this.amount = amount;
        this.stage = stage;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Stage getStage() {
        return stage;
    }

    public void setStage(Stage stage) {
        this.stage = stage;
    }
}
