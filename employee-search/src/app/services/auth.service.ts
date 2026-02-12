import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl.replace('/api/employee', '/api/auth');

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.tenantName) {
          sessionStorage.setItem('tenantName', response.tenantName);
        }
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getTenantId(): string | null {
    return null;
  }

  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  logoutApi(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
