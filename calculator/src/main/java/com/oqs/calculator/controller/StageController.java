package com.oqs.calculator.controller;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.service.StageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stages")
public class StageController {
    // Rest of the code remains the same



    @Autowired
    private StageService stageService;

    // Get all stages
    @GetMapping
    public List<Stage> getAllStages() {
        return stageService.getAllStages();
    }

    // Get a stage by ID
    @GetMapping("/{id}")
    public Stage getStageById(@PathVariable Long id) {
        return stageService.getStageById(id);
    }

    // Create a new stage
    @PostMapping
    public Stage createStage(@RequestBody Stage stage) {
        return stageService.saveStage(stage);
    }

    // Update an existing stage
    @PutMapping("/{id}")
    public Stage updateStage(@PathVariable Long id, @RequestBody Stage stage) {
        return stageService.updateStage(id, stage);
    }

    // Delete a stage
    @DeleteMapping("/{id}")
    public void deleteStage(@PathVariable Long id) {
        stageService.deleteStage(id);
    }
}
