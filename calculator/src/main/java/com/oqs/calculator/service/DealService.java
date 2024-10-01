package com.oqs.calculator.service;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealService {

    @Autowired
    private DealRepository dealRepository;

    // Get all deals
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // Get a deal by its ID
    public Deal getDealById(Long id) {
        return dealRepository.findById(id).orElseThrow(() -> new RuntimeException("Deal not found"));
    }

    // Create a new deal
    public Deal saveDeal(Deal deal) {
        return dealRepository.save(deal);
    }

    // Update an existing deal
    public Deal updateDeal(Long id, Deal updatedDeal) {
        Deal existingDeal = dealRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));

        existingDeal.setName(updatedDeal.getName());
        existingDeal.setAmount(updatedDeal.getAmount());
        existingDeal.setStage(updatedDeal.getStage());

        return dealRepository.save(existingDeal);
    }

    // Delete a deal by its ID
    public void deleteDeal(Long id) {
        dealRepository.deleteById(id);
    }
}
