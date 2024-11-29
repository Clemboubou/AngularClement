import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  priorities: any[] = [];
  employees: any[] = [];
  newTicket = { description: '', priority_id: null, created_by: 1 };
  showCreateTicket: boolean = false; // Gère l'affichage du formulaire

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTickets();
    this.getPriorities();
  }

  // Récupérer les tickets
  getTickets(): void {
    this.apiService.getTickets().subscribe((data: any[]) => {
      this.tickets = data;
    });
  }

  // Récupérer les priorités
  getPriorities(): void {
    this.apiService.getPriorities().subscribe((data: any[]) => {
      this.priorities = data;
    });
  }

  // Créer un ticket
  createTicket(): void {
    this.apiService.createTicket(this.newTicket).subscribe(() => {
      alert('Ticket créé avec succès');
      this.newTicket = { description: '', priority_id: null, created_by: 1 };
      this.getTickets(); // Rafraîchir la liste des tickets
      this.showCreateTicket = false; // Masquer le formulaire après création
    });
  }

  // Modifier le statut d'un ticket
  modifyTicket(ticketId: number): void {
    const newStatus = prompt('Entrez le nouveau statut (open/resolved) :');
    if (newStatus === 'open' || newStatus === 'resolved') {
      this.apiService.updateTicketStatus(ticketId, newStatus).subscribe(() => {
        alert('Statut modifié avec succès');
        this.getTickets(); // Rafraîchir la liste des tickets
      });
    } else {
      alert('Statut invalide. Veuillez entrer "open" ou "resolved".');
    }
  }

  deleteTicket(ticketId: number): void {
    console.log('Suppression du ticket ID :', ticketId); // Log ID

    if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      this.apiService.deleteTicket(ticketId).subscribe(
        () => {
          alert('Ticket supprimé avec succès');
          this.getTickets(); // Rafraîchir la liste
        },
        (error) => {
          console.error('Erreur lors de la suppression du ticket :', error);
          if (error.status === 404) {
            alert('Ticket introuvable. Il a peut-être déjà été supprimé.');
          } else {
            alert('Une erreur est survenue lors de la suppression du ticket.');
          }
        }
      );
    }
  }

  // Afficher ou masquer le formulaire de création
  toggleCreateTicket(): void {
    this.showCreateTicket = !this.showCreateTicket; // Inverse l'état
  }
}
