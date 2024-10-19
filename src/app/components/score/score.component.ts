import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {

  score: number = 0;
  totalQuestions: number = 0;

  constructor(private readonly route: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    // Retrieve score and totalQuestions from route parameters
    this.route.queryParams.subscribe(params => {
      this.score = Number(params['score']);
      this.totalQuestions = Number(params['totalQuestions']);
    });
  }

  // Logout method
  logout(): void {
    this.authService.logout();  // Clears the token
    this.router.navigate(['/login']);  // Redirects to the login page
  }

}
