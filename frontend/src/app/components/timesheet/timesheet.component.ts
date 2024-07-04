import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

function getDateDifference(date1: any, date2: any) {
  const diffInMs = date1 - date2;

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  return {
    milliseconds: diffInMs,
    seconds: diffInSeconds % 60,
    minutes: diffInMinutes % 60,
    hours: diffInHours % 24,
    days: diffInDays,
  };
}

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

  timeSpent(timestamp1: number, timestamp2: number): string {
    if (!timestamp1 || !timestamp2) return '0';
    const date1 = new Date(timestamp2);
    const date2 = new Date(timestamp1);
    const difference = getDateDifference(date1, date2);
    return `${difference.hours} hours, ${difference.minutes} minutes, ${difference.seconds} seconds`;
  }
}

const fullnames = [
  "John Smith",
  "Sarah Johnson",
  "Alex Williams",
  "Emily Brown",
  "Michael Davis",
  "Jessica Miller",
  "Daniel Wilson",
  "Laura Moore",
  "David Taylor",
  "Sophia Anderson",
  "James Thomas",
  "Olivia Jackson",
  "Robert Harris",
  "Emma Clark",
  "William Lewis"
];


@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css',
})
export class TimesheetComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'timeIn',
    'break1out',
    'break1in',
    'timeSpent1',
    'lunchOut',
    'lunchIn',
    'timeSpent2',
    'break2out',
    'break2in',
    'timeSpent3',
    'timeOut',
  ];

  dataSource: MatTableDataSource<Employee>;
  today: string = this.formatDate(Date.now(), true);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) 
  sort!: MatSort;

  constructor() {
    const users = fullnames.map((fullname)=> new Employee(fullname));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  punch(employee: Employee, key: string): void {
    const timestamp = Date.now();

    const row = this.dataSource.data.find((emp) => emp.name === employee.name);
    if (row) {
      row[key] = timestamp;
    }
  }

  formatDate(timestamp: number, today: boolean = false): string {
    const date = new Date(timestamp);
    const isToday =()=> today ? undefined : 'numeric';
    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'long', // 'short', 'narrow' can also be used
      year: 'numeric',
      month: 'long', // 'short', 'numeric' can also be used
      day: 'numeric',
      hour: isToday(),
      minute: isToday(),
      second: isToday(),
      hour12: true, // Use 'false' for 24-hour time
    });
    return formattedDate;
  }

  displayButton(e: any) {
    const ele = e.target.querySelector('button');
    if (ele) ele.style.display = 'block';
  }

  hideButton(e: any) {
    const ele = e.target.querySelector('button');
    if (ele) ele.style.display = 'none';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
