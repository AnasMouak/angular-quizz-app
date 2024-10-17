import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuizzService {

  private readonly quizzesUrl = 'http://localhost:8080/quizzes';

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) { }

  getQuizzes(): Observable<any[]> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` 
    });

    // Make the HTTP request to the backend to get the quizzes
    return this.http.get<any[]>(this.quizzesUrl, { headers });
  }

  getQuizQuestions(quizzId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.quizzesUrl}/${quizzId}/questions`);
  }
}
