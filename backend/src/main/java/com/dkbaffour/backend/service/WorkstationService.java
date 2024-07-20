package com.dkbaffour.backend.service;

import com.dkbaffour.backend.model.BreakLog;
import com.dkbaffour.backend.model.Workstation;
import com.dkbaffour.backend.repository.BreakLogRepository;
import com.dkbaffour.backend.repository.WorkstationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class WorkstationService {

    @Autowired
    private WorkstationRepository workstationRepository;

    @Autowired
    private BreakLogRepository breakLogRepository;

    // Save workstation
    public Workstation saveWorkstation(String name) {
        Workstation workstation = new Workstation();
        workstation.setName(name);
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
        if (workstation != null) {
            if(workstation.getMembers() == null) {
                workstation.setMembers(new HashSet<>());
            }
            workstation.getMembers().add(member);
            workstationRepository.save(workstation);
        }

        return workstation;
    }

    // Remove workstation members
    public Workstation removeWorkstationMembers(Long id, String member) {
        Workstation workstation = workstationRepository.findById(id).orElse(null);
        if (workstation != null) {
            breakLogRepository.removeMemberBreakLogs(id, member);

            workstation.getMembers().remove(member);
            workstationRepository.save(workstation);
        }
        return workstation;
    }

    // Add new break log sheet
    public Workstation addBreakLogSheet(Long id) {
        Workstation workstation = workstationRepository.findById(id).orElse(null);
        if (workstation != null) {

            if (workstation.getMembers().size() > 0) {
                Set<String> members = workstation.getMembers();

                for(String member: members) {
                    // Bulk create break logs
                    Set<BreakLog> breakLogs = new HashSet<>();
                    String[] breakTypes = {"Break 1", "Lunch", "Break 2"};

                    for (String breakType : breakTypes) {
                        BreakLog breakLog = new BreakLog();
                        breakLog.setEmployeeName(member);
                        breakLog.setBreakType(breakType);
                        breakLog.setWorkstation(workstation);

                        breakLogs.add(breakLog);
                    }
                    workstation.getBreakLogs().addAll(breakLogs);

                    breakLogRepository.saveAll(breakLogs);
                }

                workstationRepository.save(workstation);
            }
        }


        return workstation;
    }

    // Get BreakLogs of a Workstation on a specified date
    public List<BreakLog> getBreakLogsByWorkstationAndDate(Long workstationId, LocalDate creationDate) {
        return breakLogRepository.findByWorkstationIdAndCreationDate(workstationId, creationDate);
    }
}
