import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  BreakLog,
  Workstation,
  WorkstationService,
} from '../../../services/workstation.service';
import { BreakLogService } from '../../../services/break-log.service';
import { LoaderComponent } from '../../loader/loader.component';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-timecard',
  standalone: true,
  imports: [
    LoaderComponent,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './timecard.component.html',
  styleUrl: './timecard.component.css',
  providers: [provideNativeDateAdapter(), WorkstationService, BreakLogService],
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
  selectedWorkstationId_filterTable: number | null = null;
  selectedWorkstationId_createBreakLog: number | null = null;
  selectedCreationDate: string | null = null;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private workstationService: WorkstationService,
    private breakLogService: BreakLogService,
    private loaderService: LoaderService
  ) {
    this.workstationService.getWorkstations().subscribe((workstations) => {
      this.workstations = workstations;
    });
  }

  addBreakLogSheet() {
    const id = this.selectedWorkstationId_createBreakLog;
    if (id) {
      this.workstationService.addBreakLogSheet(id).subscribe({
        complete: () => {
          this.loaderService.hide();
          alert(`A new break log sheet was added!`);
        },
        error: (error) => {
          console.error('Error adding break log sheet:', error);
          this.loaderService.hide();
        },
      });
    }
  }

  punch(breakLog: BreakLog, key: 'punchIn' | 'punchOut') {
    const _breakLog = { ...breakLog };
    _breakLog[key] = this.getCurrentPunchTimestamp();
    this.loaderService.show();
    this.breakLogService.updateBreakLog(_breakLog).subscribe({
      next: (updatedBreakLog) => {
        breakLog.punchIn = updatedBreakLog.punchIn;
        breakLog.punchOut = updatedBreakLog.punchOut;
        breakLog.timeSpent = updatedBreakLog.timeSpent;
        console.log('Done updating');
      },
      complete: () => {
        this.loaderService.hide();
      },
      error: (error) => {
        console.error('Error updating break log:', error);
        this.loaderService.hide();
      },
    });
  }

  updateBreakLogs() {
    const id = this.selectedWorkstationId_filterTable;

    if (id && this.selectedCreationDate) {
      const formattedCreationDate = this.formatCreationDate(
        this.selectedCreationDate
      );

      this.currentDateDisplay = new Date(
        formattedCreationDate.replaceAll('-', '/')
      ).toDateString();

      this.workstationService
        .getBreakLogsByWorkstation(id, formattedCreationDate)
        .subscribe({
          next: (breakLogs) => {
            const updatedbreakLogs = breakLogs.map((breakLog) => ({
              ...breakLog,
              isLoading: false,
            }));
            this.breakLogs = new MatTableDataSource<BreakLog>(updatedbreakLogs);
  
            this.breakLogs.paginator = this.paginator;
            this.breakLogs.sort = this.sort;
          },
          complete: () => {
            this.loaderService.hide();
          },
          error: (error) => {
            console.error('Error getting break logs:', error);
            this.loaderService.hide();
          },
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

  getCurrentPunchTimestamp(): string {
    function padToTwoDigits(num: number) {
      return num.toString().padStart(2, '0');
    }

    const date = new Date();
    const year = date.getFullYear();
    const month = padToTwoDigits(date.getMonth() + 1); // getMonth() is zero-based
    const day = padToTwoDigits(date.getDate());
    const hours = padToTwoDigits(date.getHours());
    const minutes = padToTwoDigits(date.getMinutes());
    const seconds = padToTwoDigits(date.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
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
