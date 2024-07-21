package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.model.BreakLog;
import com.dkbaffour.backend.service.BreakLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@RestController
@RequestMapping("api/breaklogs")
@CrossOrigin(origins = "http://localhost:4200")
public class BreakLogController {

    @Autowired
    BreakLogService breakLogService;

    // Add a workstation member
    @PutMapping("/breaklog/update")
    public BreakLog updateBreakLog(@RequestBody BreakLog breakLog) {
        Long id = breakLog.getId();
        LocalDateTime punchOut = breakLog.getPunchOut();
        LocalDateTime punchIn = breakLog.getPunchIn();

        return breakLogService.updateBreakLog(id, punchOut, punchIn);
    }
}
