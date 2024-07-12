package com.dkbaffour.backend.repository;

import com.dkbaffour.backend.model.BreakLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BreakLogRepository extends JpaRepository<BreakLog, Long> {
}
