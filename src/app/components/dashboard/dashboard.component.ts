import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resolvedTicketsCount: number = 0;
  resolvedByPerson: any[] = [];
  lastResolvedTicket: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.apiService.getTickets().subscribe((tickets: any[]) => {
      this.resolvedTicketsCount = tickets.filter(ticket => ticket.status === 'resolved').length;
      this.lastResolvedTicket = tickets
        .filter(ticket => ticket.status === 'resolved')
        .sort((a, b) => new Date(b.resolved_at).getTime() - new Date(a.resolved_at).getTime())[0];

      const resolvedGrouped = tickets.filter(ticket => ticket.status === 'resolved')
        .reduce((acc, ticket) => {
          acc[ticket.assigned_to] = (acc[ticket.assigned_to] || 0) + 1;
          return acc;
        }, {});
      this.resolvedByPerson = Object.entries(resolvedGrouped).map(([user, count]) => ({
        user,
        count,
      }));
    });
  }
}
