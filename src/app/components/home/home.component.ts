import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
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
    const currentUserId = 3; // À remplacer par un ID dynamique selon l'utilisateur connecté
    this.apiService.getTickets().subscribe((data: any[]) => {
      this.tickets = data.filter(ticket => ticket.assigned_to === currentUserId);
    });
  }

  toggleResolvedTickets(): void {
    this.showResolved = !this.showResolved;
  }
}
