package com.dkbaffour.backend.repository;

import com.dkbaffour.backend.model.Workstation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkstationRepository extends JpaRepository<Workstation, Long> {
}
