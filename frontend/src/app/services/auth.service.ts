import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  private userSignedInSubject = new BehaviorSubject<userSignedIn | null>(null);
  userSignedIn$ = this.userSignedInSubject.asObservable();

  constructor(private router: Router) {}


  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isLoggedIn(): boolean {
    return this.hasToken();
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
          
          localStorage.setItem('timecard_signedInUser_fullname', response.fullName);
          localStorage.setItem('timecard_signedInUser_email', response.email);
          this.userSignedInSubject.next({fullName: response.fullName, email: response.email});
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

  getSignedInUser(): userSignedIn | null {
    const user: userSignedIn = {
      fullName: localStorage.getItem('timecard_signedInUser_fullname'),
      email: localStorage.getItem('timecard_signedInUser_email')
    }
    return user;
  }

  // User Logout
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('timecard_signedInUser_fullname');
    localStorage.removeItem('timecard_signedInUser_email');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/signin']);
  }
}

interface userSignedIn {
  fullName: string | null,
  email: string | null
}
