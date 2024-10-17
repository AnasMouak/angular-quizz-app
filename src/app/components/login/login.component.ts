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

  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(): void {

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.jwtToken) {
          // Navigate to quizzes page after successful login
          this.router.navigate(['/quizzes']);
        }
      },
      error: (err) => {
        this.error = 'Invalid credentials. Please try again.';
        console.error(err);
      }
    });
  }

}
