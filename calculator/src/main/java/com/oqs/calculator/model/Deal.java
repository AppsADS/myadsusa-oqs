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
    private Boolean orderReviewApproved;
    private String localOrderPlaceholder;
    private Boolean customerQuestionnaireCompleted;
    private Boolean scheduleConfirmed;
    private Boolean billingComplete;
    private Boolean fundingComplete;
    private Boolean submittedForPayroll;
    private Boolean pendingFinalApproval;
    private Boolean beingPaid;

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
    public Boolean getOrderReviewApproved() {
        return orderReviewApproved;
    }

    public void setOrderReviewApproved(Boolean orderReviewApproved) {
        this.orderReviewApproved = orderReviewApproved;
    }

    public String getLocalOrderPlaceholder() {
        return localOrderPlaceholder;
    }

    public void setLocalOrderPlaceholder(String localOrderPlaceholder) {
        this.localOrderPlaceholder = localOrderPlaceholder;
    }

    public Boolean getCustomerQuestionnaireCompleted() {
        return customerQuestionnaireCompleted;
    }

    public void setCustomerQuestionnaireCompleted(Boolean customerQuestionnaireCompleted) {
        this.customerQuestionnaireCompleted = customerQuestionnaireCompleted;
    }

    public Boolean getScheduleConfirmed() {
        return scheduleConfirmed;
    }

    public void setScheduleConfirmed(Boolean scheduleConfirmed) {
        this.scheduleConfirmed = scheduleConfirmed;
    }

    public Boolean getBillingComplete() {
        return billingComplete;
    }

    public void setBillingComplete(Boolean billingComplete) {
        this.billingComplete = billingComplete;
    }

    public Boolean getFundingComplete() {
        return fundingComplete;
    }

    public void setFundingComplete(Boolean fundingComplete) {
        this.fundingComplete = fundingComplete;
    }

    public Boolean getSubmittedForPayroll() {
        return submittedForPayroll;
    }

    public void setSubmittedForPayroll(Boolean submittedForPayroll) {
        this.submittedForPayroll = submittedForPayroll;
    }

    public Boolean getPendingFinalApproval() {
        return pendingFinalApproval;
    }

    public void setPendingFinalApproval(Boolean pendingFinalApproval) {
        this.pendingFinalApproval = pendingFinalApproval;
    }

    public Boolean getBeingPaid() {
        return beingPaid;
    }

    public void setBeingPaid(Boolean beingPaid) {
        this.beingPaid = beingPaid;
    }

}
