import { AfterViewInit, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

class Group {
  name: string;
  members: Member[];
  constructor(name: string) {
    this.name = name;
    this.members = [];
  }
}

export class Member {
  name: string;
  timeIn: number;
  break1out: number;
  break1in: number;
  lunchOut: number;
  lunchIn: number;
  break2out: number;
  break2in: number;
  timeOut: number;

  [key: string]: any; // index checking

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

  /* timeSpent(timestamp1: number, timestamp2: number): string {
    if (!timestamp1 || !timestamp2) return '0';
    const date1 = new Date(timestamp2);
    const date2 = new Date(timestamp1);
    const difference = getDateDifference(date1, date2);
    return `${difference.hours} hours, ${difference.minutes} minutes, ${difference.seconds} seconds`;
  } */
}

const fullnames = [
  'John Smith',
  'Sarah Johnson',
  'Alex Williams',
  'Emily Brown',
  'Michael Davis',
  'Jessica Miller',
  'Daniel Wilson',
  'Laura Moore',
  'David Taylor',
  'Sophia Anderson',
  'James Thomas',
  'Olivia Jackson',
  'Robert Harris',
  'Emma Clark',
  'William Lewis',
];

@Component({
  selector: 'app-workstation',
  standalone: true,
  imports: [MatTableModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './workstation.component.html',
  styleUrl: './workstation.component.css',
})
export class WorkstationComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Group>;
  displayedColumns: string[] = ['name', 'members'];

  constructor() {
    const groups = [
      'Visual Inspection',
      'CalCheck',
      'Membrane',
      'Applicators',
      'Quality Assurance',
      'Manufacturing Clerks'
    ].map((name) => new Group(name));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(groups);
  }

  ngAfterViewInit() {}
}
