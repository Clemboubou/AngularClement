import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../guards/auth.guards';
import { RoleGuard } from '../guards/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, // Accessible à tous les utilisateurs connectés
  {
    path: 'tickets',
    component: TicketsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['chef_service', 'employe'] }, // Accessible uniquement aux chefs de service et employés
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'chef_service'] }, // Accessible uniquement aux administrateurs et chefs de service
  },
];
