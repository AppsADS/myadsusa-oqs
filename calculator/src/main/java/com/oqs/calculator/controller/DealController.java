package com.oqs.calculator.controller;

import com.oqs.calculator.model.Deal;
import com.oqs.calculator.repository.DealRepository;
import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.StageRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private StageRepository stageRepository;

    // GET: Retrieve all deals
    @GetMapping
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }

    // GET: Retrieve a single deal by ID
    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDealById(@PathVariable Long id) {
        Optional<Deal> deal = dealRepository.findById(id);
        return deal.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new deal
    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        // Check if the Stage exists before saving the deal
        if (deal.getStage() != null) {
            Optional<Stage> stage = stageRepository.findById(deal.getStage().getId());
            if (stage.isPresent()) {
                deal.setStage(stage.get()); // Set the stage if it exists
            } else {
                return ResponseEntity.badRequest().body(null); // Stage doesn't exist
            }
        }
        Deal savedDeal = dealRepository.save(deal);
        return ResponseEntity.ok(savedDeal);
    }

    // PUT: Update an existing deal
    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable Long id, @RequestBody Deal dealDetails) {
        Optional<Deal> optionalDeal = dealRepository.findById(id);

        if (!optionalDeal.isPresent()) {
            return ResponseEntity.notFound().build(); // Deal not found
        }

        Deal existingDeal = optionalDeal.get();
        existingDeal.setName(dealDetails.getName());
        existingDeal.setAmount(dealDetails.getAmount());

        if (dealDetails.getStage() != null) {
            Optional<Stage> stage = stageRepository.findById(dealDetails.getStage().getId());
            if (stage.isPresent()) {
                existingDeal.setStage(stage.get()); // Update stage if it exists
            } else {
                return ResponseEntity.badRequest().body(null); // Stage doesn't exist
            }
        }

        Deal updatedDeal = dealRepository.save(existingDeal);
        return ResponseEntity.ok(updatedDeal);
    }

    // DELETE: Remove a deal by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        Optional<Deal> optionalDeal = dealRepository.findById(id);
        if (!optionalDeal.isPresent()) {
            return ResponseEntity.notFound().build(); // Deal not found
        }

        dealRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
