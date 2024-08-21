package com.dkbaffour.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@Table(
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"creationDate", "employeeName", "breakType", "workstation_id"})
        }
)
public class BreakLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String employeeName;

    @Column(nullable = false)
    private String breakType;

    private LocalDateTime punchOut;

    private LocalDateTime punchIn;

    private String timeSpent;

    @ManyToOne
    @JoinColumn(name = "workstation_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Workstation workstation;

    @Column(updatable = false)
    private LocalDate creationDate;

    @PrePersist
    protected void onCreate() {
        creationDate = LocalDate.now();
    }
}
