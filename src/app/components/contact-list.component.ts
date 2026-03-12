import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-800">Contact List</h3>
        <a routerLink="/contacts/add" 
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm">
          Add New
        </a>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <th class="px-8 py-4">Name</th>
              <th class="px-8 py-4">Email</th>
              <th class="px-8 py-4">Phone</th>
              <th class="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let contact of contacts()" class="hover:bg-gray-50 transition-colors">
              <td class="px-8 py-4 font-medium text-gray-900">{{ contact.name }}</td>
              <td class="px-8 py-4 text-gray-600">{{ contact.email }}</td>
              <td class="px-8 py-4 text-gray-600">{{ contact.phone }}</td>
              <td class="px-8 py-4 text-right space-x-3">
                <a [routerLink]="['/contacts/edit', contact.id]" 
                  class="text-indigo-600 hover:text-indigo-900 font-medium text-sm">
                  Edit
                </a>
                <button (click)="onDelete(contact.id)" 
                  class="text-red-600 hover:text-red-900 font-medium text-sm">
                  Delete
                </button>
              </td>
            </tr>
            <tr *ngIf="contacts().length === 0">
              <td colspan="4" class="px-8 py-12 text-center text-gray-400 italic">
                No contacts found. Click "Add New" to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ContactListComponent {
  contacts;

  constructor(private contactService: ContactService) {
    this.contacts = this.contactService.contacts;
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id);
    }
  }
}
