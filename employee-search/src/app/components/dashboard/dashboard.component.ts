import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tenantName: string = '';

  constructor(private router: Router) {
    this.tenantName = sessionStorage.getItem('tenantName') || 'User';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
