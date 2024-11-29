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
  name: string | null = null;
  role: string | null = null;

  constructor(private router: Router, private userService: UserService) {
    this.userService.name$.subscribe((name) => (this.name = name));
    this.userService.role$.subscribe((role) => (this.role = role));
  }

  logout(): void {
    this.userService.clearUserInfo();
    this.router.navigate(['/login']);
  }
}
