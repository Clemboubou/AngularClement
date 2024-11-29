import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('role') ?? ''; // Assure que role est une chaîne vide si null
    const allowedRoles = route.data['roles'] as Array<string>;

    if (allowedRoles.includes(role)) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
