import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  users: User[] = [];
  errorMessage = '';
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      response => {
        this.errorMessage = '';
        this.router.navigate(['/search']);
      },
      error => {
        this.errorMessage = 'Login failed';
      }
    );
  }

  getUsers(): void {
    this.authService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );
  }
}
