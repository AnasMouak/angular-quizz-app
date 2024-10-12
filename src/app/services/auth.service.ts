import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:8080/register';
  private readonly loginUrl = 'http://localhost:8080/login';
  
  private username: string | undefined;

  constructor(private readonly http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.loginUrl}`, user).pipe(
      // After successful login, store the username
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  // Method to store the username
  setUsername(username: string): void {
    this.username = username;
  }

  // Method to retrieve the username
  getUsername(): string | undefined {
    return this.username;
  }
}