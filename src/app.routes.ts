
import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/admin/admin-layout.component';
import { DashboardComponent } from './components/admin/dashboard.component';
import { HistoryComponent } from './components/admin/history.component';
import { SettingsComponent } from './components/admin/settings.component';
import { InputPenomoranComponent } from './components/admin/input-penomoran.component';
import { UserPageComponent } from './components/user/user-page.component';

export const routes: Routes = [
  { path: '', component: UserPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [() => inject(AuthService).isLoggedIn() || '/login'],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'input', component: InputPenomoranComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
