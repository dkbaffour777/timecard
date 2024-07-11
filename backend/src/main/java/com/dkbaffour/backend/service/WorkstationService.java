package com.dkbaffour.backend.service;

import com.dkbaffour.backend.model.Workstation;
import com.dkbaffour.backend.repository.WorkstationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkstationService {

    @Autowired
    private WorkstationRepository workstationRepository;

    // Save workstation
    public Workstation saveWorkstation(Workstation workstation) {
        return workstationRepository.save(workstation);
    }

    // Get all workstations
    public List<Workstation> getAllWorkstations() {
        return workstationRepository.findAll();
    }

    // Get a workstation
    public Workstation getWorkstationById(Long id) {
        return workstationRepository.findById(id).orElse(null);
    }

    // Delete a workstation
    public void removeWorkstationById(Long id) {
        workstationRepository.deleteById(id);
    }

    // Add workstation members
    public Workstation addWorkstationMembers(Long id, String member) {
        Workstation workstation = workstationRepository.findById(id).orElse(null);
        if(workstation != null) {
            workstation.getMembers().add(member);
            workstationRepository.save(workstation);
        }
        return workstation;
    }

    // Remove workstation members
    public Workstation removeWorkstationMembers(Long id, String member) {
        Workstation workstation = workstationRepository.findById(id).orElse(null);
        if(workstation != null) {
            workstation.getMembers().remove(member);
            workstationRepository.save(workstation);
        }
        return workstation;
    }
}
