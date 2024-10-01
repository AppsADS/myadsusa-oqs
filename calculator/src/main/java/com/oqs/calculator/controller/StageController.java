package com.oqs.calculator.controller;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stages")
public class StageController {

    @Autowired
    private StageRepository stageRepository;

    // GET: Retrieve all stages
    @GetMapping
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    // GET: Retrieve a single stage by ID
    @GetMapping("/{id}")
    public ResponseEntity<Stage> getStageById(@PathVariable Long id) {
        Optional<Stage> stage = stageRepository.findById(id);
        return stage.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Create a new stage
    @PostMapping
    public ResponseEntity<Stage> createStage(@Valid @RequestBody Stage stage) {
        Stage savedStage = stageRepository.save(stage);
        return ResponseEntity.ok(savedStage);
    }

    // PUT: Update an existing stage by ID
    @PutMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@PathVariable Long id, @Valid @RequestBody Stage stageDetails) {
        Optional<Stage> optionalStage = stageRepository.findById(id);

        if (!optionalStage.isPresent()) {
            return ResponseEntity.notFound().build(); // Stage not found
        }

        Stage existingStage = optionalStage.get();
        existingStage.setName(stageDetails.getName());
        existingStage.setDescription(stageDetails.getDescription());

        Stage updatedStage = stageRepository.save(existingStage);
        return ResponseEntity.ok(updatedStage);
    }

    // DELETE: Remove a stage by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStage(@PathVariable Long id) {
        Optional<Stage> optionalStage = stageRepository.findById(id);
        if (!optionalStage.isPresent()) {
            return ResponseEntity.notFound().build(); // Stage not found
        }

        stageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
