package com.oqs.calculator.service;

import com.oqs.calculator.model.Stage;
import com.oqs.calculator.repository.StageRepository;
import com.oqs.calculator.exception.StageNotFoundException;  // Custom Exception
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StageService {

    private final StageRepository stageRepository;

    public StageService(StageRepository stageRepository) {
        this.stageRepository = stageRepository;
    }

    public List<Stage> getAllStages() {
        return stageRepository.findAll();
    }

    public Stage getStageById(Long id) {
        return stageRepository.findById(id)
                .orElseThrow(() -> new StageNotFoundException(id));  // Using custom exception
    }

    @Transactional
    public Stage saveStage(Stage stage) {
        return stageRepository.save(stage);
    }

    @Transactional
    public Stage updateStage(Long id, Stage updatedStage) {
        Stage existingStage = stageRepository.findById(id)
                .orElseThrow(() -> new StageNotFoundException(id));  // Using custom exception

        existingStage.setName(updatedStage.getName());
        existingStage.setDescription(updatedStage.getDescription());

        return stageRepository.save(existingStage);
    }

    @Transactional
    public void deleteStage(Long id) {
        if (!stageRepository.existsById(id)) {
            throw new StageNotFoundException(id);  // Using custom exception
        }
        stageRepository.deleteById(id);
    }
}
