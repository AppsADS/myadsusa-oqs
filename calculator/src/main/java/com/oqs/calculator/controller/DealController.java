package com.oqs.calculator.controller;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.model.Deal;
import com.oqs.calculator.service.DealService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api")
public class DealController {
    private final DealService dealService;

    public DealController(DealService dealService) {
        this.dealService = dealService;
    }

    @GetMapping("/deals")
    public List<Deal> getAllDeals() {
        return dealService.getAllDeals();
    }

    @GetMapping("/stages")
    public List<Stage> getAllStages() {
        return dealService.getAllStages(); // Ensure that dealService is returning the list of stages
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "Backend is running";
    }


    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDealById(@PathVariable Long id) {
        Optional<Deal> deal = dealService.getDealById(id);
        return deal.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable Long id, @RequestBody Deal updatedDeal) {
        try {
            Deal deal = dealService.updateDeal(id, updatedDeal);
            return ResponseEntity.ok(deal);
        } catch (RuntimeException e) {
            // Log the error for better traceability
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/stage/{stageId}")
    public ResponseEntity<Deal> updateDealStage(@PathVariable Long id, @PathVariable Long stageId) {
        Deal updatedDeal = dealService.updateDealStage(id, stageId);
        return ResponseEntity.ok(updatedDeal);
    }



}


