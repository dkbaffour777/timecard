import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workstation } from './workstation.service';

@Injectable({
  providedIn: 'root',
})
export class WorkstationSharedDataService {
  private selectedWorkstation = new BehaviorSubject<Workstation | null>(null);
  currentSelectedWorkstation = this.selectedWorkstation.asObservable();

  private workstations = new BehaviorSubject<Workstation[] | null>(null);
  currentWorkstations = this.workstations.asObservable();

  constructor() {}

  setSelectedWorkstation(workstation: Workstation) {
    console.log('Selected workstation', workstation);
    this.selectedWorkstation.next(workstation);
  }

  setWorkstations(workstations: Workstation[]) {
    console.log('Updated workstations', workstations);
    this.workstations.next(workstations);
  }
}
