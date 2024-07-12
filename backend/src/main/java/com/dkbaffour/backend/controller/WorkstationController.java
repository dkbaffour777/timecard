package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.model.Workstation;
import com.dkbaffour.backend.model.BreakLog;
import com.dkbaffour.backend.service.WorkstationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/workstations")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkstationController {

    @Autowired
    WorkstationService workstationService;

    // Add a workstation
    @PostMapping("/workstation/add")
    public Workstation createWorkstation(@RequestBody String name) {
        return workstationService.saveWorkstation(name);
    }

    // Add a workstation member
    @PutMapping("/workstation/{id}/member/add")
    public Workstation addWorkstationMember(@PathVariable Long id, @RequestBody String member) {
        return workstationService.addWorkstationMembers(id, member);
    }

    // Remove a workstation member
    @PutMapping("/workstation/{id}/member/remove")
    public Workstation removeWorkstationMember(@PathVariable Long id, @RequestBody String member) {
        return workstationService.removeWorkstationMembers(id, member);
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

    // Delete workStation by id
    @DeleteMapping("/workstation/delete/{id}")
    public void deleteWorkstation(@PathVariable Long id) {
        workstationService.removeWorkstationById(id);
    }

    // Get BreakLogs for a specific Workstation
    @GetMapping("/workstation/{id}/breaklogs")
    public List<BreakLog> getBreakLogsByWorkstationAndDate(@PathVariable Long id, @RequestParam String creationDate) {
        LocalDate parsedDate = LocalDate.parse(creationDate);
        return workstationService.getBreakLogsByWorkstationAndDate(id, parsedDate);
    }
}
