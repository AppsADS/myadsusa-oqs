package com.oqs.calculator.repository;

import com.oqs.calculator.model.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {
}
