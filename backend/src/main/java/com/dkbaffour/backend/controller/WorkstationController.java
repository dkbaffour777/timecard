package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.model.Workstation;
import com.dkbaffour.backend.model.BreakLog;
import com.dkbaffour.backend.service.WorkstationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/workstations")
@CrossOrigin(origins = "http://localhost:4200")
public class WorkstationController {

    @Autowired
    WorkstationService workstationService;

    @PostMapping("/workstation/add")
    @PreAuthorize("hasRole('ADMIN')")
    public Workstation createWorkstation(@RequestBody String name) {
        return workstationService.saveWorkstation(name);
    }

    @PutMapping("/workstation/{id}/member/add")
    @PreAuthorize("hasRole('ADMIN')")
    public Workstation addWorkstationMember(@PathVariable Long id, @RequestBody String member) {
        return workstationService.addWorkstationMembers(id, member);
    }

    @PutMapping("/workstation/{id}/member/remove")
    @PreAuthorize("hasRole('ADMIN')")
    public Workstation removeWorkstationMember(@PathVariable Long id, @RequestBody String member) {
        return workstationService.removeWorkstationMembers(id, member);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Workstation> getAllWorkstation() {
        return workstationService.getAllWorkstations();
    }

    @GetMapping("/workstation/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Workstation getWorkstationById(@PathVariable Long id) {
        return workstationService.getWorkstationById(id);
    }

    @DeleteMapping("/workstation/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteWorkstation(@PathVariable Long id) {
        workstationService.removeWorkstationById(id);
    }

    @PostMapping("/workstation/{id}/breaklogsheet/add")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public Workstation addBreakLogSheet(@PathVariable Long id) {
        return workstationService.addBreakLogSheet(id);
    }

    @GetMapping("/workstation/{id}/breaklogs")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<BreakLog> getBreakLogsByWorkstationAndDate(@PathVariable Long id, @RequestParam String creationDate) {
        LocalDate parsedDate = LocalDate.parse(creationDate);
        return workstationService.getBreakLogsByWorkstationAndDate(id, parsedDate);
    }
}
