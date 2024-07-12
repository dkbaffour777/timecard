package com.dkbaffour.backend.repository;

import com.dkbaffour.backend.model.BreakLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BreakLogRepository extends JpaRepository<BreakLog, Long> {
    @Query("SELECT b FROM BreakLog b WHERE b.workstation.id = :workstationId AND b.creationDate = :creationDate")
    List<BreakLog> findByWorkstationIdAndCreationDate(
            @Param("workstationId") Long workstationId, @Param("creationDate") LocalDate creationDate);
}
