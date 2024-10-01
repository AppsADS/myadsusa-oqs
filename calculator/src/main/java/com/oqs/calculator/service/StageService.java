package com.oqs.calculator.service;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StageService {

    @Autowired
    private StageRepository stageRepository;

    // Get all stages
    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    // Get a stage by its ID
    public Stage getStageById(Long id) {
        return stageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stage not found"));
    }

    // Create a new stage
    public Stage saveStage(Stage stage) {
        return stageRepository.save(stage);
    }

    // Update an existing stage
    public Stage updateStage(Long id, Stage updatedStage) {
        Stage existingStage = stageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stage not found"));

        existingStage.setName(updatedStage.getName());
        existingStage.setDescription(updatedStage.getDescription());

        return stageRepository.save(existingStage);
    }

    // Delete a stage by its ID
    public void deleteStage(Long id) {
        stageRepository.deleteById(id);
    }
}
