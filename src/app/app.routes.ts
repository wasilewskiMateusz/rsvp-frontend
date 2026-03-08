import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { AdminComponent } from './components/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rsvp/:token', component: HomeComponent },
  { path: 'admin/:token', component: AdminComponent },
  { path: '**', redirectTo: '' }
];
