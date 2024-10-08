package com.oqs.calculator.service;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.DealRepository;
import com.oqs.calculator.repository.StageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DealService {

    private final DealRepository dealRepository;
    private final StageRepository stageRepository;

    public DealService(DealRepository dealRepository, StageRepository stageRepository) {
        this.dealRepository = dealRepository;
        this.stageRepository = stageRepository;
    }
    public List<Stage> getAllStages() {
        return stageRepository.findAll(); // Assuming you're using JPA Repository
    }

    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Fetch a deal by ID
    public Optional<Deal> getDealById(Long id) {
        return dealRepository.findById(id);
    }

    // Update an existing deal
    public Deal updateDeal(Long id, Deal updatedDeal) {
        return dealRepository.findById(id)
                .map(deal -> {
                    // Set action items and any other updated fields
                    deal.setOrderReviewApproved(updatedDeal.getOrderReviewApproved());
                    deal.setLocalOrderPlaceholder(updatedDeal.getLocalOrderPlaceholder());
                    deal.setCustomerQuestionnaireCompleted(updatedDeal.getCustomerQuestionnaireCompleted());
                    deal.setScheduleConfirmed(updatedDeal.getScheduleConfirmed());
                    deal.setBillingComplete(updatedDeal.getBillingComplete());
                    deal.setFundingComplete(updatedDeal.getFundingComplete());
                    deal.setSubmittedForPayroll(updatedDeal.getSubmittedForPayroll());
                    deal.setPendingFinalApproval(updatedDeal.getPendingFinalApproval());
                    deal.setBeingPaid(updatedDeal.getBeingPaid());

                    // Add any additional fields to update
                    return dealRepository.save(deal); // Save the updated deal
                })
                .orElseThrow(() -> new RuntimeException("Deal not found"));
    }

    public Deal updateDealStage(Long dealId, Long stageId) {
        return dealRepository.findById(dealId)
                .map(deal -> {
                    Stage newStage = stageRepository.findById(stageId)
                            .orElseThrow(() -> new RuntimeException("Stage not found"));
                    deal.setStage(newStage);
                    return dealRepository.save(deal);
                })
                .orElseThrow(() -> new RuntimeException("Deal not found"));
    }

}

