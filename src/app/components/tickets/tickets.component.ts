import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  priorities: any[] = [];
  newTicket = { description: '', priority_id: null, created_by: 1 };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getTickets();
    this.getPriorities();
  }

  getTickets(): void {
    this.apiService.getTickets().subscribe((data: any[]) => {
      this.tickets = data;
    });
  }

  getPriorities(): void {
    this.apiService.getPriorities().subscribe((data: any[]) => {
      this.priorities = data;
    });
  }

  createTicket(): void {
    this.apiService.createTicket(this.newTicket).subscribe(() => {
      alert('Ticket créé avec succès');
      this.getTickets();
    });
  }
}
