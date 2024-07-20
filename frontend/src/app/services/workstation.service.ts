import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WorkstationSharedDataService } from './workstation-shared-data.service';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  http = inject(HttpClient);

  constructor(private sharedDataWorkstation: WorkstationSharedDataService) {}

  private apiUrl = 'http://localhost:8080/api/workstations';

  getWorkstations(): Observable<Workstation[]> {
    return this.http.get<Workstation[]>(this.apiUrl);
  }

  addWorkstation(name: string): Observable<Workstation> {
    return this.http.post<Workstation>(`${this.apiUrl}/workstation/add`, name);
  }

  addWorkstationMember(member: string): string[] {
    const selectedMembers: string[] = [];
    this.sharedDataWorkstation.currentSelectedWorkstation
      .subscribe((workstation) => {
        if (workstation) {
          this.http
            .put<Workstation>(
              `${this.apiUrl}/workstation/${workstation.id}/member/add`,
              member
            )
            .subscribe((workstation: Workstation) => {
              // Update the selected workstation's members
              workstation.members.map((member) => selectedMembers.push(member));
              console.log('Added workstation member', workstation);
            });
        }
      })
      .unsubscribe();
    return selectedMembers;
  }

  addBreakLogSheet(workstation_id: number): Observable<Workstation> {
    return this.http.post<Workstation>(`${this.apiUrl}/workstation/${workstation_id}/breaklogsheet/add`, null);
  }

  getBreakLogsByWorkstation(id: number, creationDate: string): Observable<BreakLog[]> {
    return this.http.get<BreakLog[]>(
      `${this.apiUrl}/workstation/${id}/breaklogs?creationDate=${creationDate}`
    );
  }

  removeWorkstationMember(workstation_id: number, member: string): Observable<Workstation> {
    return this.http.put<Workstation>(
      `${this.apiUrl}/workstation/${workstation_id}/member/remove`, member
    );
  }

  deleteWorkstation(workstation_id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/workstation/delete/${workstation_id}`);
  }
}

export interface Workstation {
  id: number;
  name: string;
  members: string[];
  breakLogs: BreakLog[];
}

export interface BreakLog {
  id: number;
  employeeName: string;
  breakType: string;
  punchOut: number;
  punchIn: number;
  timeSpent: string;
}
