import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { LayoutComponent } from './components/layout.component';
import { DashboardComponent } from './components/dashboard.component';
import { ContactListComponent } from './components/contact-list.component';
import { ContactFormComponent } from './components/contact-form.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contacts', component: ContactListComponent },
      { path: 'contacts/add', component: ContactFormComponent },
      { path: 'contacts/edit/:id', component: ContactFormComponent }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
