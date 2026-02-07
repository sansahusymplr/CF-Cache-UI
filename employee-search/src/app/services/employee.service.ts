import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResponse } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmployees(page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<Employee>>(this.apiUrl, { params });
  }

  search(firstName?: string, lastName?: string, companyName?: string, position?: string, page: number = 1, pageSize: number = 10): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    if (firstName) params = params.set('firstName', firstName);
    if (lastName) params = params.set('lastName', lastName);
    if (companyName) params = params.set('companyName', companyName);
    if (position) params = params.set('position', position);

    return this.http.get<PagedResponse<Employee>>(`${this.apiUrl}/search`, { params });
  }

  getByFirstName(firstName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('firstName', firstName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<Employee>>(`${this.apiUrl}/by-firstname`, { params });
  }

  getByLastName(lastName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('lastName', lastName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<Employee>>(`${this.apiUrl}/by-lastname`, { params });
  }

  getByCompany(companyName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('companyName', companyName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<Employee>>(`${this.apiUrl}/by-company`, { params });
  }

  getByPosition(position: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    const params = new HttpParams()
      .set('position', position)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<PagedResponse<Employee>>(`${this.apiUrl}/by-position`, { params });
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
}
