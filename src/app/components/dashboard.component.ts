import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-6">
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-2xl font-bold text-gray-800">Welcome to Your Contact Book!</h3>
        <p class="text-gray-600 mt-2">Manage your professional and personal contacts in one place.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-indigo-50 p-6 rounded-xl border border-indigo-100 shadow-sm">
          <div class="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-2">Total Contacts</div>
          <div class="text-4xl font-extrabold text-indigo-900">{{ totalContacts() }}</div>
          <div class="mt-4 text-sm text-indigo-700 font-medium">
            <a routerLink="/contacts" class="hover:underline">View All →</a>
          </div>
        </div>

        <div class="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <div class="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2">Quick Add</div>
          <p class="text-emerald-900 text-sm mb-4">Easily add new people to your network.</p>
          <div class="text-sm text-emerald-700 font-medium">
            <a routerLink="/contacts/add" class="hover:underline">Add New Contact →</a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  totalContacts = computed(() => this.contactService.contacts().length);

  constructor(private contactService: ContactService) {}
}
