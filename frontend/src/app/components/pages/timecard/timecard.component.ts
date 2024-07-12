import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import {
  BreakLog,
  Workstation,
  WorkstationService,
} from '../../../services/workstation.service';

@Component({
  selector: 'app-timecard',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    HttpClientModule,
  ],
  templateUrl: './timecard.component.html',
  styleUrl: './timecard.component.css',
  providers: [provideNativeDateAdapter(), WorkstationService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimecardComponent {
  fixedDisplayedColumns: string[] = ['name', 'breakType'];

  scrollableDisplayedColumns: string[] = [
    'name',
    'breakType',
    'punchOut',
    'punchIn',
    'timeSpent',
  ];

  breakLogs: MatTableDataSource<BreakLog> = new MatTableDataSource<BreakLog>();
  workstations: Workstation[] = [];
  currentDateDisplay: string = '---';
  selectedWorkstationId: number | null = null;
  selectedCreationDate: string | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private workstationService: WorkstationService) {
    this.workstationService.getWorkstations().subscribe((workstations) => {
      this.workstations = workstations;
      console.log(workstations);
    });
  }

  punch(breakLog: BreakLog, key: string): void {
    const timestamp = Date.now();
    const id = breakLog.id;
    const row = this.breakLogs.data.find((breakLog) => breakLog.id === id);
    if (row) {
      //row[key] = timestamp;
    }
  }

  updateBreakLogs() {
    const id = this.selectedWorkstationId;

    if (id && this.selectedCreationDate) {
      const formattedCreationDate = this.formatCreationDate(
        this.selectedCreationDate
      );

      this.currentDateDisplay = new Date(
        formattedCreationDate.replaceAll('-', '/')
      ).toDateString();

      this.workstationService
        .getBreakLogsByWorkstation(id, formattedCreationDate)
        .subscribe((breakLogs) => {
          this.breakLogs = new MatTableDataSource<BreakLog>(breakLogs);

          this.breakLogs.paginator = this.paginator;
          this.breakLogs.sort = this.sort;
        });
    }
  }

  formatTimeStampDate(timestamp: number, today: boolean = false): string {
    const date = new Date(timestamp);
    const isToday = () => (today ? undefined : 'numeric');
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

  formatCreationDate(dateString: string) {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Get the year, month, and day from the Date object
    const year = date.getFullYear();
    // Months are zero-based in JavaScript, so we need to add 1
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    // Combine year, month, and day into the desired format
    return `${year}-${month}-${day}`;
  }

  getDateDifference(date1: any, date2: any) {
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

  getTimeSpent(punchOut: number, punchIn: number): string {
    if (!punchOut || !punchIn) return '0';
    const date1 = new Date(punchIn);
    const date2 = new Date(punchOut);
    const difference = this.getDateDifference(date1, date2);
    return `${difference.hours} hr, ${difference.minutes} min, ${difference.seconds} sec`;
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
