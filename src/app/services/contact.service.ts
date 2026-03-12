import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly STORAGE_KEY = 'personal_contacts';
  private contactsSignal = signal<Contact[]>(this.loadContacts());

  contacts = this.contactsSignal.asReadonly();

  private loadContacts(): Contact[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveContacts(contacts: Contact[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contacts));
    this.contactsSignal.set(contacts);
  }

  getContacts(): Contact[] {
    return this.contactsSignal();
  }

  getContactById(id: string): Contact | undefined {
    return this.contactsSignal().find(c => c.id === id);
  }

  addContact(contact: Omit<Contact, 'id'>): void {
    const newContact: Contact = {
      ...contact,
      id: crypto.randomUUID()
    };
    const updated = [...this.contactsSignal(), newContact];
    this.saveContacts(updated);
  }

  updateContact(id: string, contact: Omit<Contact, 'id'>): void {
    const updated = this.contactsSignal().map(c => 
      c.id === id ? { ...contact, id } : c
    );
    this.saveContacts(updated);
  }

  deleteContact(id: string): void {
    const updated = this.contactsSignal().filter(c => c.id !== id);
    this.saveContacts(updated);
  }
}
