import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactListComponent } from './contact-list.component';
import { ContactService } from '../services/contact.service';
import { of } from 'rxjs';
import { vi } from 'vitest';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent, RouterTestingModule],
      providers: [ContactService]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show "No contacts found" when list is empty', () => {
    // Force empty contacts if needed (mocking if necessary, but here we can just clear)
    localStorage.clear();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td')?.textContent).toContain('No contacts found');
  });

  it('should render contact rows', () => {
    contactService.addContact({ name: 'John Doe', email: 'john@example.com', phone: '0812345678' });
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('td')?.textContent).toContain('John Doe');
  });

  it('should call delete on button click', () => {
    contactService.addContact({ name: 'John Doe', email: 'john@example.com', phone: '0812345678' });
    fixture.detectChanges();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(contactService, 'deleteContact');
    
    const deleteBtn = fixture.nativeElement.querySelector('button');
    deleteBtn.click();
    
    expect(contactService.deleteContact).toHaveBeenCalled();
  });
});
