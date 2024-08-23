import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {}


  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Company Sign-Up
  signUpCompany(companyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/companies/signup`, companyData);
  }

  // Admin Sign-Up
  signUpAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/signup`, adminData);
  }

  // User Sign-In
  signInUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/signin`, credentials).pipe(
      map((response: any) => {
        if (response.token) {
          this.setToken(response.token);
          this.isAuthenticatedSubject.next(true); // Update authentication status
        }
        return response;
      })
    );
  }

  // Helper to set and get tokens
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
    this.isAuthenticatedSubject.next(true); // Update authentication status
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Log out
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false); // Update authentication status
  }
}
