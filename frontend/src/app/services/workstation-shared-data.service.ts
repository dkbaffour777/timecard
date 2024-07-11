import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Workstation } from './workstation.service';

@Injectable({
  providedIn: 'root'
})
export class WorkstationSharedDataService {
  private selectedWorkstation = new BehaviorSubject<Workstation | null>(null);
  currentSelectedWorkstation = this.selectedWorkstation.asObservable();

  constructor() {}

  setSelectedWorkstation(workstation: Workstation) {
    console.log("Selected workstation", workstation)
    this.selectedWorkstation.next(workstation);
  }
}
