import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-indigo-900 text-white flex-shrink-0">
        <div class="p-6">
          <h1 class="text-2xl font-bold tracking-tight">ContactBook</h1>
        </div>
        <nav class="mt-6">
          <a routerLink="/dashboard" routerLinkActive="bg-indigo-700" [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 transition-colors">
            <span class="ml-3">Dashboard</span>
          </a>
          <a routerLink="/contacts" routerLinkActive="bg-indigo-700"
            class="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 transition-colors">
            <span class="ml-3">Contacts</span>
          </a>
          <a routerLink="/contacts/add" routerLinkActive="bg-indigo-700"
            class="flex items-center px-6 py-3 text-indigo-100 hover:bg-indigo-700 transition-colors">
            <span class="ml-3">Add Contact</span>
          </a>
        </nav>
        <div class="absolute bottom-0 w-64 p-6">
          <button (click)="onLogout()" 
            class="w-full py-2 px-4 bg-indigo-800 hover:bg-red-600 rounded-md transition-colors text-sm font-medium">
            Sign out
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto">
        <header class="bg-white shadow-sm h-16 flex items-center px-8">
          <h2 class="text-xl font-semibold text-gray-800">Personal Dashboard</h2>
        </header>
        <div class="p-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `
})
export class LayoutComponent {
  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.logout();
  }
}
