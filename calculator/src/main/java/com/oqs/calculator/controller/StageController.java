package com.oqs.calculator.controller;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/stages")
public class StageController {

    private static final Logger log = LoggerFactory.getLogger(StageController.class);

    @Autowired
    private StageService stageService;

    // Get all stages
    @GetMapping
    public ResponseEntity<List<Stage>> getAllStages() {
        log.debug("Request received to fetch all stages");
        List<Stage> stages = stageService.getAllStages();
        log.debug("Fetched stages: {}", stages);
        return ResponseEntity.ok(stages); // Return 200 OK with the list of stages
    }

    // Get a stage by ID
    @GetMapping("/{id}")
    public ResponseEntity<Stage> getStageById(@PathVariable Long id) {
        log.debug("Request received to fetch stage by ID: {}", id);
        Stage stage = stageService.getStageById(id);
        log.debug("Fetched stage: {}", stage);
        return ResponseEntity.ok(stage); // Return 200 OK with the stage
    }

    // Create a new stage
    @PostMapping
    public ResponseEntity<Stage> createStage(@RequestBody Stage stage) {
        log.debug("Request received to create a new stage: {}", stage);
        Stage createdStage = stageService.saveStage(stage);
        log.debug("Created stage: {}", createdStage);
        return ResponseEntity.status(201).body(createdStage); // Return 201 Created with the new stage
    }

    // Update an existing stage
    @PutMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable Long id, @RequestBody Stage stage) {
        log.debug("Request received to update stage with ID: {}", id);
        Stage updatedStage = stageService.updateStage(id, stage);
        log.debug("Updated stage: {}", updatedStage);
        return ResponseEntity.ok(updatedStage); // Return 200 OK with the updated stage
    }

    // Delete a stage
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
        log.debug("Request received to delete stage with ID: {}", id);
        stageService.deleteStage(id);
        log.debug("Deleted stage with ID: {}", id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }
}
