import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/workstations';

  getWorkstations(): Observable<Workstation[]> {
    return this.http.get<Workstation[]>(this.apiUrl);
  }

  addWorkstation(name: string): Observable<Workstation> {
    const newWorkstation: Omit<Workstation, 'id'> = {
      name: name,
      members: []
    };

    return this.http.post<Workstation>(`${this.apiUrl}/workstation/add`, newWorkstation);
  }
}

export interface Workstation {
  id: number;
  name: string;
  members: string[];
}
