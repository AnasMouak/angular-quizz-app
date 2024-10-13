import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  score: number = 0;

  constructor(private readonly quizzService: QuizzService, private readonly route: ActivatedRoute, private readonly router: Router) { }

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

  // Submit the quiz and calculate the score
  submitQuiz(): void {
    this.score = 0;
    
    // Loop over questions and check if the selected answer is correct
    this.questions.forEach((question, index) => {
      const selectedAnswerId = this.selectedAnswers[index];
      const correctAnswer = question.answers.find((answer: any) => answer.isCorrect);

      // Compare selected answer with the correct answer
      if (correctAnswer && correctAnswer.id === selectedAnswerId) {
        this.score++;
      }
    });

    // Navigate to the score page
    this.router.navigate(['/score'], {
      queryParams: {
        score: this.score,
        totalQuestions: this.questions.length
      }
    });
  }  

}
