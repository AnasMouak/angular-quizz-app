import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';
import { ActivatedRoute } from '@angular/router';
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
  selectedAnswers: string[] = [];

  constructor(private readonly quizzService: QuizzService, private readonly route: ActivatedRoute) { }

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

}
