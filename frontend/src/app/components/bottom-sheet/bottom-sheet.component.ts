import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  Workstation,
  WorkstationService,
} from '../../services/workstation.service';
import { WorkstationSharedDataService } from '../../services/workstation-shared-data.service';

/**
 * Bottom Sheet Component
 */
@Component({
  selector: 'bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css'],
  standalone: true,
  providers: [WorkstationService],
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class BottomSheetComponent implements OnInit {
  members: string[] = [];
  newWorkstationMember: string = '';
  selectedWorkstationName: string = '';
  workstation_id: number | null = null;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private workstationService: WorkstationService,
    private sharedDataWorkstation: WorkstationSharedDataService
  ) {}

  addWorkstationMember() {
    if (this.newWorkstationMember) {
      this.members = this.workstationService.addWorkstationMember(
        this.newWorkstationMember
      );
      this.newWorkstationMember = '';
    }
  }

  removeWorkstationMember(member: string) {
    if (this.workstation_id) {
      this.workstationService
        .removeWorkstationMember(this.workstation_id, member)
        .subscribe((workstation: Workstation) => {
          this.members = workstation.members;
        });
    }
  }

  deleteWorkstation() {
    if (this.workstation_id) {
      const isDelete = confirm(
        `Are you sure you want to delete ${this.selectedWorkstationName}? This action cannot be undone.`
      );
      if(isDelete) {
        this.workstationService.deleteWorkstation(this.workstation_id).subscribe(() => {
          this._bottomSheetRef.dismiss();
        });
      }
    }
  }

  ngOnInit(): void {
    this.sharedDataWorkstation.currentSelectedWorkstation.subscribe(
      (workstation) => {
        if (workstation) {
          this.workstation_id = workstation.id;
          this.selectedWorkstationName = workstation.name;
          this.members = [...workstation.members];
        }
      }
    );
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  closeBottomSheet(event: MouseEvent): void {
    console.log(event.target);
  }

  trackByName(index: number, employee: string): string {
    return employee;
  }
}
