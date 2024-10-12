import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private readonly quizzesUrl = 'http://localhost:8080/quizzes';

  constructor(private readonly http: HttpClient) { }

  getQuizzes(): any {
    return this.http.get(this.quizzesUrl);
  }
}
