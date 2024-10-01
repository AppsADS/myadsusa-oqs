package com.oqs.calculator.controller;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.service.DealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealService dealService;

    // Get all deals
    @GetMapping
    public List<Deal> getAllDeals() {
        return dealService.getAllDeals();
    }

    // Get a deal by ID
    @GetMapping("/{id}")
    public Deal getDealById(@PathVariable Long id) {
        return dealService.getDealById(id);
    }

    // Create a new deal
    @PostMapping
    public Deal createDeal(@RequestBody Deal deal) {
        return dealService.saveDeal(deal);
    }

    // Update an existing deal
    @PutMapping("/{id}")
    public Deal updateDeal(@PathVariable Long id, @RequestBody Deal deal) {
        return dealService.updateDeal(id, deal);
    }

    // Delete a deal
    @DeleteMapping("/{id}")
    public void deleteDeal(@PathVariable Long id) {
        dealService.deleteDeal(id);
    }
}
