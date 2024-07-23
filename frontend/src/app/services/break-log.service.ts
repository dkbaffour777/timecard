import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BreakLog } from './workstation.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakLogService {
  http = inject(HttpClient);

  constructor() {}

  private apiUrl = 'http://localhost:8080/api/breaklogs';

  updateBreakLog(breakLog: BreakLog): Observable<BreakLog> {
    return this.http.put<BreakLog>(
      `${this.apiUrl}/breaklog/update`, breakLog
    );
  }

}
