import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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

export class BreakType {
  type: string;
  timeLimitInMinutes: number;

  constructor(type: string, timeLimitInMinutes: number) {
    this.type = type;
    this.timeLimitInMinutes = timeLimitInMinutes;
  }
}

export class Employee {
  name: string;
  timeIn: number;
  timeOut: number;

  [key: string]: any; // index checking

  constructor(name: string) {
    this.name = name;
    this.timeIn = 0;
    this.timeOut = 0;
  }
}

class BreakLog {
  id: number;
  date: number;
  breakType: string;
  punchOut: number;
  punchIn: number;
  employee: string;

  [key: string]: any; // index checking

  constructor(id: number, breakType: string, employee: string) {
    this.id = id;
    this.date = Date.now()
    this.breakType = breakType;
    this.punchOut = 0;
    this.punchIn = 0;
    this.employee = employee;
  }

  getTimeSpent(punchOut: number, punchIn: number): string {
    if (!punchOut || !punchIn) return '0';
    const date1 = new Date(punchIn);
    const date2 = new Date(punchOut);
    const difference = getDateDifference(date1, date2);
    return `${difference.hours} hr, ${difference.minutes} min, ${difference.seconds} sec`;
  }
}

class Group {
  name: string;
  members: Employee[];
  breakTypes: BreakType[];
  breakLogs: BreakLog[];

  constructor(name: string, breakTypes: BreakType[]) {
    this.name = name;
    this.members = [];
    this.breakTypes = breakTypes.map((breakType) => breakType);
    this.breakLogs = [];
  }

  addMember(member: Employee) {
    this.members.push(member);
  }

  setupBreakLogs() {
    /**
     * Each break type maps to each member of the group in a break log
     */
    const breakLogs = this.breakTypes.map(({type}) => type)
    .map((type) => this.members.map(({name}) => ({type, name})))
    .map((newObjArray) => newObjArray.map((obj) => obj));
    
    let counter = 0;
    
    breakLogs.forEach((breakLogArray) => {
      breakLogArray.forEach(({type, name}) => {
        this.#addBreakLog(new BreakLog(counter, type, name));
        counter++;
      });
    })
  }

  #addBreakLog(breakLog: BreakLog) {
    this.breakLogs.push(breakLog);
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

const groups = [
  'Visual Inspection',
  'CalCheck',
  'Membrane',
  'Applicators',
  'Quality Assurance',
  'Manufacturing Clerks',
].map((name) => {
  const breakTypes = [
    {type: 'break 1', timeLimitInMinutes: 24},
    {type: 'Lunch', timeLimitInMinutes: 30},
    {type: 'break 2', timeLimitInMinutes: 24}
  ]
  const group = new Group(name, breakTypes);
  fullnames.map((fn) => {
    const employee = new Employee(fn);
    group.addMember(employee);
  });
  
  return group;
});


@Component({
  selector: 'app-timecard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  templateUrl: './timecard.component.html',
  styleUrl: './timecard.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimecardComponent implements AfterViewInit {
  fixedDisplayedColumns: string[] = [
    'name',
    'breakType',
  ];
  
  scrollableDisplayedColumns: string[] = [
    'name',
    'breakType',
    'punchOut',
    'punchIn',
    'timeSpent'
  ];

  breakLogs: MatTableDataSource<BreakLog>;
  groups: Group[] = groups;
  today: string = this.formatDate(Date.now(), true);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) 
  sort!: MatSort;

  constructor() {
    groups.map(group => group.setupBreakLogs());
    console.log(groups[0].breakLogs)
    this.breakLogs = new MatTableDataSource<BreakLog>(groups[0].breakLogs);
  }

  ngAfterViewInit() {
    this.breakLogs.paginator = this.paginator;
    this.breakLogs.sort = this.sort;
  }

  punch(breakLog: BreakLog, key: string): void {
    const timestamp = Date.now();
    const id = breakLog.id;
    const row = this.breakLogs.data.find((breakLog) => breakLog.id === id);
    if (row) {
      row[key] = timestamp;
    }
  }

  formatDate(timestamp: number, today: boolean = false): string {
    const date = new Date(timestamp);
    const isToday =()=> today ? undefined : 'numeric';
    const formattedDate = date.toLocaleString('en-US', {
      weekday: 'short', // 'short', 'narrow' can also be used
      year: 'numeric',
      month: 'short', // 'short', 'numeric' can also be used
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
    this.breakLogs.filter = filterValue.trim().toLowerCase();

    if (this.breakLogs.paginator) {
      this.breakLogs.paginator.firstPage();
    }
  }
}
