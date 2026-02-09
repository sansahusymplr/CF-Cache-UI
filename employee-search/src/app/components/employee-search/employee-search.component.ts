import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee, PagedResponse } from '../../models/employee.model';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  employees: Employee[] = [];
  total = 0;
  totalPages = 0;
  page = 1;
  pageSize = 200;
  isSearchMode = false;
  showAddForm = false;
  successMessage = '';
  
  searchCriteria = {
    firstName: '',
    lastName: '',
    companyName: '',
    position: ''
  };

  newEmployee = {
    firstName: '',
    lastName: '',
    companyName: '',
    position: ''
  };

  constructor(private employeeService: EmployeeService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
  }

  loadEmployees(): void {
    this.isSearchMode = false;
    this.showAddForm = false;
    this.employeeService.getEmployees(this.page, this.pageSize).subscribe(
      (response: PagedResponse<Employee>) => {
        this.employees = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
      }
    );
  }

  search(): void {
    this.isSearchMode = true;
    this.showAddForm = false;
    this.employeeService.search(
      this.searchCriteria.firstName || undefined,
      this.searchCriteria.lastName || undefined,
      this.searchCriteria.companyName || undefined,
      this.searchCriteria.position || undefined,
      this.page,
      this.pageSize
    ).subscribe(
      (response: PagedResponse<Employee>) => {
        this.employees = response.data;
        this.total = response.total;
        this.totalPages = response.totalPages;
      }
    );
  }

  clear(): void {
    this.searchCriteria = { firstName: '', lastName: '', companyName: '', position: '' };
    this.page = 1;
    this.employees = [];
    this.total = 0;
    this.totalPages = 0;
    this.isSearchMode = false;
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.isSearchMode ? this.search() : this.loadEmployees();
    }
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.isSearchMode ? this.search() : this.loadEmployees();
    }
  }

  addEmployee(): void {
    this.employeeService.addEmployee(this.newEmployee).subscribe(
      () => {
        this.newEmployee = { firstName: '', lastName: '', companyName: '', position: '' };
        this.showAddForm = false;
        this.successMessage = 'Employee added successfully!';
        setTimeout(() => this.successMessage = '', 3000);
        this.page = 1;
        if (this.isSearchMode) {
          this.search();
        } else {
          this.loadEmployees();
        }
      }
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
