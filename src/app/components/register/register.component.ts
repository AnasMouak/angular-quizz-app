import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  };

  message: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe(
      response => {
        this.message = 'Registration successful!';
        this.router.navigate(['/login']);  // Redirect to login after successful registration
      },
      error => {
        this.message = 'Registration failed. Please try again.';
      }
    );
  }
}
