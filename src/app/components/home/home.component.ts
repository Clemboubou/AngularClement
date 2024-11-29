import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [ApiService, FormsModule], // Fournit le service au composant
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tickets: any[] = [];
  showResolved: boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAssignedTickets();
  }

  getAssignedTickets(): void {
    const currentUserId = 3; // À remplacer par l'utilisateur connecté
    this.apiService.getTickets().subscribe(
      (data: any[]) => {
        console.log('Tickets reçus :', data); // Vérifie les données reçues
        this.tickets = data.filter(ticket => ticket.assigned_to === currentUserId);
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets :', error);
      }
    );
  }

  toggleResolvedTickets(): void {
    this.showResolved = !this.showResolved;
  }
}
