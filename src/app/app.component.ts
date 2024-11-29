import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, RouterModule, CommonModule], // Ajouter CommonModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  role: string | null = null; // Rôle utilisateur
  isLoggedIn: boolean = false; // État de connexion

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  // Vérifie si l'utilisateur est connecté
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.role = localStorage.getItem('role');
    this.isLoggedIn = !!token; // Convertit en booléen
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.role = null;
    this.router.navigate(['/login']);
  }
}
