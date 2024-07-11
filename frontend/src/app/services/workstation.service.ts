import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WorkstationSharedDataService } from './workstation-shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  http = inject(HttpClient);
  
  constructor(private sharedDataWorkstation: WorkstationSharedDataService) {

  }

  private apiUrl = 'http://localhost:8080/api/workstations';

  getWorkstations(): Observable<Workstation[]> {
    return this.http.get<Workstation[]>(this.apiUrl);
  }

  addWorkstation(name: string): Observable<Workstation> {
    const newWorkstation: Omit<Workstation, 'id'> = {
      name: name,
      members: [],
    };

    return this.http.post<Workstation>(
      `${this.apiUrl}/workstation/add`,
      newWorkstation
    );
  }

  addWorkstationMembers(member: string): void {
    this.sharedDataWorkstation.currentSelectedWorkstation.subscribe((workstation) => {
      if(workstation) {
        this.http
          .put<Workstation>(`${this.apiUrl}/workstation/${workstation.id}/member/add`, member)
          .subscribe((workstation: Workstation) => {
            this.sharedDataWorkstation.setselectedWorkstation(workstation);
            console.log('Added workstation member', workstation);
          });
      }
    })
  }
}

export interface Workstation {
  id: number;
  name: string;
  members: string[];
}
