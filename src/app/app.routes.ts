import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizzComponent } from './components/quizz/quizz.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'quizzes', component: QuizzComponent },
    { path: '**', redirectTo: 'login' }  // Redirect any unknown routes to login
  ];
  
