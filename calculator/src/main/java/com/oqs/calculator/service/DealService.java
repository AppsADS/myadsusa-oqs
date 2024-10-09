package com.oqs.calculator.service;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.DealRepository;
import com.oqs.calculator.repository.StageRepository;
import com.oqs.calculator.exception.DealNotFoundException;
import com.oqs.calculator.exception.StageNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class DealService {

    private static final Logger logger = LoggerFactory.getLogger(DealService.class);

    private final DealRepository dealRepository;
    private final StageRepository stageRepository;

    public DealService(DealRepository dealRepository, StageRepository stageRepository) {
        this.dealRepository = dealRepository;
        this.stageRepository = stageRepository;
    }

    // Fetch all stages
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    // Fetch all deals with pagination
    public Page<Deal> getAllDeals(Pageable pageable) {
        return dealRepository.findAll(pageable);
    }

    // Fetch all deals without pagination
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Fetch a deal by ID
    public Optional<Deal> getDealById(Long id) {
        return dealRepository.findById(id);
    }

    // Update an existing deal
    @Transactional
    public Deal updateDeal(Long id, Deal updatedDeal) {
        return dealRepository.findById(id)
                .map(deal -> {
                    logger.info("Updating deal with ID: " + id);

                    if (updatedDeal.getOrderReviewApproved() != null) {
                        deal.setOrderReviewApproved(updatedDeal.getOrderReviewApproved());
                    }

                    if (updatedDeal.getLocalOrderPlaceholder() != null) {
                        deal.setLocalOrderPlaceholder(updatedDeal.getLocalOrderPlaceholder());
                    }

                    if (updatedDeal.getCustomerQuestionnaireCompleted() != null) {
                        deal.setCustomerQuestionnaireCompleted(updatedDeal.getCustomerQuestionnaireCompleted());
                    }

                    if (updatedDeal.getScheduleConfirmed() != null) {
                        deal.setScheduleConfirmed(updatedDeal.getScheduleConfirmed());
                    }

                    if (updatedDeal.getBillingComplete() != null) {
                        deal.setBillingComplete(updatedDeal.getBillingComplete());
                    }

                    if (updatedDeal.getFundingComplete() != null) {
                        deal.setFundingComplete(updatedDeal.getFundingComplete());
                    }

                    if (updatedDeal.getSubmittedForPayroll() != null) {
                        deal.setSubmittedForPayroll(updatedDeal.getSubmittedForPayroll());
                    }

                    if (updatedDeal.getPendingFinalApproval() != null) {
                        deal.setPendingFinalApproval(updatedDeal.getPendingFinalApproval());
                    }

                    if (updatedDeal.getBeingPaid() != null) {
                        deal.setBeingPaid(updatedDeal.getBeingPaid());
                    }

                    return dealRepository.save(deal); // Save the updated deal
                })
                .orElseThrow(() -> new DealNotFoundException(id));
    }

    // Update the stage of a deal
    @Transactional
    public Deal updateDealStage(Long dealId, Long stageId) {
        logger.info("Updating stage for deal ID: " + dealId + " to stage ID: " + stageId);

        return dealRepository.findById(dealId)
                .map(deal -> {
                    Stage newStage = stageRepository.findById(stageId)
                            .orElseThrow(() -> new StageNotFoundException(stageId));
                    deal.setStage(newStage);
                    return dealRepository.save(deal);
                })
                .orElseThrow(() -> new DealNotFoundException(dealId));
    }

}
