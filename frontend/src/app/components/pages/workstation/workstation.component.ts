import { AfterViewInit, Component } from '@angular/core';
import {
  MatBottomSheet,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  WorkstationService,
  Workstation,
} from '../../../services/workstation.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BottomSheetComponent } from '../../bottom-sheet/bottom-sheet.component';
import { WorkstationSharedDataService } from '../../../services/workstation-shared-data.service';


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
    private workstationService: WorkstationService,
    private sharedDataWorkstation: WorkstationSharedDataService
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
        this.sharedDataWorkstation.setWorkstations(workstations);
        console.log('Workstations', workstations);
      });
  }

  openBottomSheet(workstation: Workstation): void {
    this.sharedDataWorkstation.setSelectedWorkstation(workstation);
    const bottomSheetRef = this._bottomSheet.open(BottomSheetComponent);

    bottomSheetRef.afterDismissed().subscribe(() => {
      this.getWorkStations();  // Refresh the data when the bottom sheet is dismissed
    });
  }
}
