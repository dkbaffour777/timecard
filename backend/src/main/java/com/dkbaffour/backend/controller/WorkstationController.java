package com.dkbaffour.backend.controller;


import com.dkbaffour.backend.model.Workstation;
import com.dkbaffour.backend.service.WorkstationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/workstations")
public class WorkstationController {

    @Autowired
    WorkstationService workstationService;

    // Add a workstation
    @PostMapping("/workstation/add")
    public Workstation createWorkstation(Workstation workstation) {
        return workstationService.saveWorkstation(workstation);
    }

    // Get all workstations
    @GetMapping
    public List<Workstation> getAllWorkstation() {
        return workstationService.getAllWorkstations();
    }

    // Find a workstation by id
    @GetMapping("/workstation/{id}")
    public Workstation getWorkstationById(@PathVariable Long id) {
        return workstationService.getWorkstationById(id);
    }
}
