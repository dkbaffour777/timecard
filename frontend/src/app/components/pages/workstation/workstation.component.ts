import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import {
  WorkstationService,
  Workstation,
} from '../../../services/workstation.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

/**
 * Bottom Sheet Component
 */
@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
})
export class BottomSheetComponent {
  members: string[] = [];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>
  ) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  trackByName(index: number, employee: string): string {
    return employee;
  }
}

/**
 * Workstation Component
 */
@Component({
  selector: 'app-workstation',
  standalone: true,
  providers: [WorkstationService],
  imports: [
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.css'],
})
export class WorkstationComponent implements AfterViewInit {
  dataSource: MatTableDataSource<Workstation> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'members'];
  newWorkstationName: string = '';

  constructor(
    private _bottomSheet: MatBottomSheet,
    private workstationService: WorkstationService
  ) {}

  addWorkstation(): void {
    if (this.newWorkstationName) {
      this.workstationService
        .addWorkstation(this.newWorkstationName)
        .subscribe((workstation: Workstation) => {
          console.log('Added Workstation', workstation);
          this.dataSource.data = [...this.dataSource.data, workstation];
          this.newWorkstationName = '';
        });
    }
  }

  ngAfterViewInit(): void {
    this.getWorkStations();
  }

  getWorkStations() {
    this.workstationService
      .getWorkstations()
      .subscribe((workstations: Workstation[]) => {
        this.dataSource = new MatTableDataSource(workstations);
        console.log('Workstations', workstations);
      });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }
}
