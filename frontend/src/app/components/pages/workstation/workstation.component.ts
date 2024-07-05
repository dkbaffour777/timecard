import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
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

/**
 * Bottom Sheet Component
 */
@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.css',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule, MatFormFieldModule, MatInputModule],
})
export class BottomSheetComponent {
  members: Member[] = fullnames.map((fullname) => new Member(fullname));

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  trackByName(index: number, member: Member): string {
    return member.name;
  }
}

/**
 * Workstation Component
 */
@Component({
  selector: 'app-workstation',
  standalone: true,
  imports: [
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './workstation.component.html',
  styleUrl: './workstation.component.css',
})
export class WorkstationComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Group>;
  displayedColumns: string[] = ['name', 'members'];

  constructor(private _bottomSheet: MatBottomSheet) {
    const groups = [
      'Visual Inspection',
      'CalCheck',
      'Membrane',
      'Applicators',
      'Quality Assurance',
      'Manufacturing Clerks',
    ].map((name) => new Group(name));
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(groups);
  }

  ngAfterViewInit() {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
