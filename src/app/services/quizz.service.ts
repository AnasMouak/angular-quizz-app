import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private readonly quizzesUrl = 'http://localhost:8080/quizzes';

  constructor(private readonly http: HttpClient) { }

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.quizzesUrl);
  }

  getQuizQuestions(quizzId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.quizzesUrl}/${quizzId}/questions`);
  }
}
