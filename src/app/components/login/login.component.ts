import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule], // Ajouter FormsModule ici
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router
  ) {}
  login(): void {
    this.apiService.login({ email: this.email }).subscribe(
      (response: any) => {
        console.log('Connexion réussie :', response);
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('name', response.name);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erreur de connexion :', error);
      }
    );
  }

}
