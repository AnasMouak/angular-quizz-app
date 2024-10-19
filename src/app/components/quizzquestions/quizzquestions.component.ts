import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quizzquestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quizzquestions.component.html',
  styleUrls: ['./quizzquestions.component.css']
})
export class QuizzquestionsComponent implements OnInit {

  questions: any[] = [];
  quizzId: number | undefined;
  selectedAnswers: number[] = [];

  constructor(private readonly quizzService: QuizzService, private readonly route: ActivatedRoute, private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.quizzId = Number(this.route.snapshot.paramMap.get('quizzId'));

    // Fetch the questions for the selected quiz
    if (this.quizzId) {
      this.quizzService.getQuizQuestions(this.quizzId).subscribe({
        next: (data: any) => {
          this.questions = data;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
    }
  }

  // Submit the quiz and send selected answers to the backend
  submitQuiz(): void {
    // Ensure that the selectedAnswers array is sent to the backend
    if (this.quizzId) {
      this.quizzService.submitQuiz(this.quizzId, this.selectedAnswers).subscribe({
        next: (response: any) => {
          // Navigate to the score page with the received score
          this.router.navigate(['/score'], {
            queryParams: {
              score: response.score,  // Assuming the backend returns the score
              totalQuestions: this.questions.length
            }
          });
        },
        error: (err: any) => {
          console.error('Error submitting quiz:', err);
        }
      });
    }
  }
  
    // Logout method
    logout(): void {
      this.authService.logout();  // Clears the token
      this.router.navigate(['/login']);  // Redirects to the login page
    }

}
