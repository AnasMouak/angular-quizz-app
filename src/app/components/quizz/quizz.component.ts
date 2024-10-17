import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizzes: any[] = [];
  error: string | null = null;

  constructor(
    private readonly quizzService: QuizzService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizzService.getQuizzes().subscribe({
      next: (data) => {
        this.quizzes = data; // Assign fetched quizzes to the component property
      },
      error: (err) => {
        this.error = 'Failed to load quizzes.';
        console.error(err);
      }
    });
  }

  // Navigate to the questions page
  selectQuiz(quizzId: number) {
    this.router.navigate([`/quizzes/${quizzId}/questions`]);
  }
  // Logout method
  logout(): void {
    this.authService.logout();  // Clears the token
    this.router.navigate(['/login']);  // Redirects to the login page
  }

}
