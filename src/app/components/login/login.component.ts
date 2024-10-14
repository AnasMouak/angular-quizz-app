import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user = {
    username: '',
    password: ''
  };

  message: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {

    if (!this.user.username || !this.user.password) {
      this.message = 'Username and password are required.';
      return;  // Prevent form submission if fields are empty
    }
    this.authService.login(this.user).subscribe({
      next: (response: any) => {
        // Extract username from the response
        const username = response.username;  // Assuming the response contains the username

        // Store the username
        this.authService.setUsername(username);

        // On successful login
        this.message = 'Login successful!';
        this.router.navigate(['/quizzes']);  // Redirect to quizzes after successful login
      },
      error: (err) => {
        // On failed login
        this.message = 'Login failed. Please try again.';
        console.error(err);
      }
    });
  }

}
