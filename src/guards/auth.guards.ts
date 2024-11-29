import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      // Utilisateur connecté
      return true;
    } else {
      // Redirige vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
