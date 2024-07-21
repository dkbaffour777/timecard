package com.dkbaffour.backend.service;

import com.dkbaffour.backend.model.BreakLog;
import com.dkbaffour.backend.repository.BreakLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
public class BreakLogService {

    @Autowired
    private BreakLogRepository breakLogRepository;

    // Update break log
    public BreakLog updateBreakLog(Long id, LocalDateTime punchOut, LocalDateTime punchIn) {
        BreakLog breakLog = breakLogRepository.findById(id).orElse(null);
        if (breakLog != null && breakLog.getId() == id) {
            if(punchOut != null && punchIn == null) {
                breakLog.setPunchOut(punchOut);
            } else if (punchOut != null && punchIn != null) {
                breakLog.setPunchIn(punchIn);
                breakLog.setPunchOut(punchOut);

                Duration duration = Duration.between(punchOut, punchIn);
                long hours = duration.toHours();
                long minutes = duration.toMinutes() % 60;
                long seconds = duration.toSeconds() % 60;
                String stringFormat = String.format("%02d:%02d:%02d", hours, minutes, seconds);

                breakLog.setTimeSpent(stringFormat);
            }
            breakLogRepository.save(breakLog);
        }

        return breakLog;
    }
}
