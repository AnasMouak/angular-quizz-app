import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly registerUrl = 'http://localhost:8080/register';
  private readonly loginUrl = 'http://localhost:8080/login';
  private readonly tokenKey = 'jwtToken';
  

  constructor(private readonly http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.loginUrl}`, { username, password }).pipe(
      map((response: any) => {
        if (response.jwtToken) {
          // Store the token in localStorage
          localStorage.setItem(this.tokenKey, response.jwtToken);
        }
        return response;
      })
    );
  }

  // Method to retrieve the token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Method to check if the user is logged in (based on the presence of a token)
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  // Logout method - Clear the token and username
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}