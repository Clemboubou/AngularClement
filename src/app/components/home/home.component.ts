import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajout des modules nécessaires
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tickets: any[] = [];
  showResolved: boolean = true;
  currentUserId: number = 3; // Exemple utilisateur connecté

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAssignedTickets();
  }

  getAssignedTickets(): void {
    this.apiService.getTickets().subscribe((data: any[]) => {
      this.tickets = data.filter(ticket => ticket.assigned_to === this.currentUserId);
    });
  }

  toggleResolvedTickets(): void {
    this.showResolved = !this.showResolved;
  }

  resolveTicket(ticketId: number): void {
    this.apiService.resolveTicket(ticketId).subscribe(() => {
      alert('Ticket résolu');
      this.getAssignedTickets(); // Rafraîchit la liste des tickets
    });
  }
}
