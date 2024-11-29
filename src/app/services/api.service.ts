import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3500'; // Adresse de votre backend

  constructor(private http: HttpClient) {}

  // Obtenir tous les tickets
  getTickets(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tickets`);
  }

  // Créer un ticket
  createTicket(ticket: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/tickets`, ticket);
  }

  // Résoudre un ticket
  resolveTicket(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tickets/${id}/resolve`, {});
  }

  // Assigner un ticket
  assignTicket(id: number, assignedTo: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/tickets/${id}/assign`, { assigned_to: assignedTo });
  }

  // Obtenir les priorités
  getPriorities(): Observable<any> {
    return this.http.get(`${this.baseUrl}/priorities`);
  }

  // Créer une priorité
  createPriority(priority: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/priorities`, priority);
  }

  // Obtenir les utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }
}
