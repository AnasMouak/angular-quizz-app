import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve score and totalQuestions from route parameters
    this.route.queryParams.subscribe(params => {
      this.score = Number(params['score']);
      this.totalQuestions = Number(params['totalQuestions']);
    });
  }

}
