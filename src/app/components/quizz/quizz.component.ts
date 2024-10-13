import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizzService } from '../../services/quizz.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizzes: any[] = [];
  username: string | undefined;  // To store the username

  constructor(
    private readonly quizzService: QuizzService,
    private readonly authService: AuthService  // Inject AuthService
  ) { }

  ngOnInit(): void {
    // Fetch the quizzes
    this.quizzService.getQuizzes().subscribe({
      next: (data: any[]) => {
        this.quizzes = data;
      },
      error: (err: any) => {
        console.error(err);
      }
    });

    // Fetch the username from AuthService
    this.username = this.authService.getUsername();
  }
}
