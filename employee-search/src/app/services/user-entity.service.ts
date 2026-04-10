import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Entity {
  id: number;
  name: string;
  tenantId: string;
}

export interface UserEntityResponse {
  email: string;
  entities: Entity[];
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserEntityService {
  private apiUrl = environment.apiUrl.replace('/employee', '/UserEntity');

  constructor(private http: HttpClient) {}

  getEntitiesByEmail(email: string): Observable<UserEntityResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.get<UserEntityResponse>(`${this.apiUrl}/search/by-email`, { params });
  }
}
