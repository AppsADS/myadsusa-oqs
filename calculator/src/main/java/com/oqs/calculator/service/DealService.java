package com.oqs.calculator.service;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealService {

    private final DealRepository dealRepository;

    @Autowired
    public DealService(DealRepository dealRepository) {
        this.dealRepository = dealRepository;
    }

    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    public Deal getDealById(Long id) {
        return dealRepository.findById(id).orElse(null); // Returns null if the deal is not found
    }

    public Deal createDeal(Deal deal) {
        return dealRepository.save(deal);
    }

    public Deal updateDeal(Long id, Deal deal) {
        return dealRepository.findById(id).map(existingDeal -> {
            existingDeal.setName(deal.getName());
            existingDeal.setAmount(deal.getAmount());
            existingDeal.setStage(deal.getStage());
            return dealRepository.save(existingDeal);
        }).orElse(null);  // Returns null if the deal to be updated is not found
    }

    public boolean deleteDeal(Long id) {
        if (dealRepository.existsById(id)) {
            dealRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }
}
