import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 bg-gray-50">
        <h3 class="text-xl font-bold text-gray-800">
          {{ isEditMode ? 'Edit Contact' : 'Add New Contact' }}
        </h3>
        <p class="text-gray-500 text-sm mt-1">
          {{ isEditMode ? 'Update information for this contact.' : 'Enter contact details below.' }}
        </p>
      </div>

      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="px-8 py-8 space-y-6">
        <div class="space-y-2">
          <label for="name" class="block text-sm font-bold text-gray-700 uppercase tracking-tight">Full Name</label>
          <input id="name" formControlName="name" type="text" 
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="e.g. Somchai Jai-dee">
          <div *ngIf="contactForm.get('name')?.touched && contactForm.get('name')?.invalid" class="text-red-500 text-xs mt-1 font-medium">
            <span *ngIf="contactForm.get('name')?.errors?.['required']">Name is required.</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="email" class="block text-sm font-bold text-gray-700 uppercase tracking-tight">Email Address</label>
            <input id="email" formControlName="email" type="email" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="somchai@example.com">
            <div *ngIf="contactForm.get('email')?.touched && contactForm.get('email')?.invalid" class="text-red-500 text-xs mt-1 font-medium">
              <span *ngIf="contactForm.get('email')?.errors?.['required']">Email is required.</span>
              <span *ngIf="contactForm.get('email')?.errors?.['email']">Please enter a valid email.</span>
            </div>
          </div>

          <div class="space-y-2">
            <label for="phone" class="block text-sm font-bold text-gray-700 uppercase tracking-tight">Phone Number</label>
            <input id="phone" formControlName="phone" type="tel" 
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              placeholder="0812345678">
            <div *ngIf="contactForm.get('phone')?.touched && contactForm.get('phone')?.invalid" class="text-red-500 text-xs mt-1 font-medium">
              <span *ngIf="contactForm.get('phone')?.errors?.['required']">Phone is required.</span>
              <span *ngIf="contactForm.get('phone')?.errors?.['pattern']">Phone must be exactly 10 digits.</span>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <label for="address" class="block text-sm font-bold text-gray-700 uppercase tracking-tight">Address (Optional)</label>
          <textarea id="address" formControlName="address" rows="3"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
            placeholder="123 Sukhumvit Rd, Bangkok"></textarea>
        </div>

        <div class="flex items-center justify-end space-x-4 pt-4 border-t border-gray-100">
          <a routerLink="/contacts" class="text-gray-500 hover:text-gray-700 text-sm font-medium">Cancel</a>
          <button type="submit" [disabled]="contactForm.invalid"
            class="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-sm font-bold transition-all shadow-md disabled:bg-indigo-300 disabled:shadow-none">
            {{ isEditMode ? 'Update Contact' : 'Save Contact' }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['']
    });
  }

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.isEditMode = true;
      const contact = this.contactService.getContactById(this.contactId);
      if (contact) {
        this.contactForm.patchValue(contact);
      } else {
        this.router.navigate(['/contacts']);
      }
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      if (this.isEditMode && this.contactId) {
        this.contactService.updateContact(this.contactId, this.contactForm.value);
      } else {
        this.contactService.addContact(this.contactForm.value);
      }
      this.router.navigate(['/contacts']);
    }
  }
}
