import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export class Employee {
  name: string;
  timeIn: number;
  break1out: number;
  break1in: number;
  lunchOut: number;
  lunchIn: number;
  break2out: number;
  break2in: number;
  timeOut: number;

  constructor(name: string) {
    this.name = name;
    this.timeIn = 0;
    this.break1out = 0;
    this.break1in = 0;
    this.lunchOut = 0;
    this.lunchIn = 0;
    this.break2out = 0;
    this.break2in = 0;
    this.timeOut = 0;
  }

  timeSpent1(): string {
    return (this.break1in - this.break1out).toLocaleString();
  }

  timeSpent2(): string {
    return (this.lunchIn - this.lunchOut).toLocaleString();
  }

  timeSpent3(): string {
    return (this.break2in - this.break2out).toLocaleString();
  }
}

const EMPLOYEE_DATA: Employee[] = [
  new Employee("John Doe"),
  new Employee("Sarah Newman"),
  new Employee("Alex House"),
  new Employee("Jane Smith")
];

@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent {
  displayedColumns: string[] = [
    'timeIn', 'break1out', 'break1in', 'timeSpent1', 
    'lunchOut', 'lunchIn', 'timeSpent2', 'break2out', 'break2in', 
    'timeSpent3', 'timeOut'
  ];
  dataSource = EMPLOYEE_DATA;
}
