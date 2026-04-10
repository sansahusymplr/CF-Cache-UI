import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, PagedResponse } from '../models/employee.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;
  private searchUrl = environment.apiUrl.replace('/employee', '/employee/search');
  private upsertUrl = environment.apiUrl.replace('/employee', '/employee/upsert');

  constructor(private http: HttpClient, private authService: AuthService) {}

  private appendEntity(params: HttpParams): HttpParams {
    const entities = sessionStorage.getItem('selectedEntities');
    if (entities) {
      const parsed = JSON.parse(entities) as string[];
      parsed.forEach(e => params = params.append('entity', e));
    }
    return params;
  }

  getEmployees(page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    params = this.appendEntity(params);
    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}`, { params });
  }

  search(firstName?: string, lastName?: string, companyName?: string, position?: string, page: number = 1, pageSize: number = 10): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    if (firstName) params = params.set('firstName', firstName);
    if (lastName) params = params.set('lastName', lastName);
    if (companyName) params = params.set('companyName', companyName);
    if (position) params = params.set('position', position);
    params = this.appendEntity(params);

    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/search`, { params });
  }

  getByFirstName(firstName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('firstName', firstName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    params = this.appendEntity(params);
    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/by-firstname`, { params });
  }

  getByLastName(lastName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('lastName', lastName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    params = this.appendEntity(params);
    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/by-lastname`, { params });
  }

  getByCompany(companyName: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('companyName', companyName)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    params = this.appendEntity(params);
    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/by-company`, { params });
  }

  getByPosition(position: string, page: number, pageSize: number): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('position', position)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    params = this.appendEntity(params);
    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/by-position`, { params });
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    return this.http.post<Employee>(this.upsertUrl, employee);
  }

  updateEmployee(id: number, employee: Omit<Employee, 'id'>): Observable<any> {
    return this.http.put(`${this.upsertUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.upsertUrl}/${id}`);
  }

  searchByDepartment(firstName?: string, department?: string, page: number = 1, pageSize: number = 50): Observable<PagedResponse<Employee>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    
    if (firstName) params = params.set('firstName', firstName);
    if (department) params = params.set('department', department);
    params = this.appendEntity(params);

    return this.http.get<PagedResponse<Employee>>(`${this.searchUrl}/{tenantId}/by-department`, { params });
  }
}
