import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizzComponent } from './components/quizz/quizz.component';
import { QuizzquestionsComponent } from './components/quizzquestions/quizzquestions.component';
import { ScoreComponent } from './components/score/score.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'quizzes', component: QuizzComponent , canActivate: [authGuard] },
    { path: 'quizzes/:quizzId/questions', component: QuizzquestionsComponent, canActivate: [authGuard] },
    { path: 'score', component: ScoreComponent },
    { path: '**', redirectTo: 'login' }  // Redirect any unknown routes to login
  ];
  
