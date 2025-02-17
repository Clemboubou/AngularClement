import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'], // Ajout du fichier CSS
})
export class DashboardComponent implements OnInit {
  resolvedCount: number = 0;
  lastResolved: any = null;
  resolvedByPerson: any = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData(): void {
    this.apiService.getTickets().subscribe((tickets: any[]) => {
      const resolved = tickets.filter(ticket => ticket.status === 'resolved');
      this.resolvedCount = resolved.length;
      this.lastResolved = resolved.sort(
        (a, b) => new Date(b.resolved_at).getTime() - new Date(a.resolved_at).getTime()
      )[0];

      const grouped = resolved.reduce((acc, ticket) => {
        acc[ticket.assigned_to] = (acc[ticket.assigned_to] || 0) + 1;
        return acc;
      }, {});

      this.resolvedByPerson = Object.entries(grouped).map(([user, count]) => ({ user, count }));
    });
  }
}
