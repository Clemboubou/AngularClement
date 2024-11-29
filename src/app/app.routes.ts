import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Route pour Accueil
  { path: 'tickets', component: TicketsComponent }, // Route pour Voir les tickets
  { path: 'dashboard', component: DashboardComponent }, // Route pour Créer un ticket
  { path: "**", redirectTo: "" }
];
