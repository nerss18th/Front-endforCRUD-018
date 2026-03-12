import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a contact', () => {
    const newContact = { name: 'Test User', email: 'test@example.com', phone: '0812345678' };
    service.addContact(newContact);
    const contacts = service.getContacts();
    expect(contacts.length).toBe(1);
    expect(contacts[0].name).toBe('Test User');
  });

  it('should update a contact', () => {
    const newContact = { name: 'Initial Name', email: 'initial@example.com', phone: '0812345678' };
    service.addContact(newContact);
    const contact = service.getContacts()[0];
    
    service.updateContact(contact.id, { ...newContact, name: 'Updated Name' });
    const updatedContact = service.getContactById(contact.id);
    expect(updatedContact?.name).toBe('Updated Name');
  });

  it('should delete a contact', () => {
    const newContact = { name: 'To Be Deleted', email: 'delete@example.com', phone: '0812345678' };
    service.addContact(newContact);
    const contact = service.getContacts()[0];
    
    service.deleteContact(contact.id);
    expect(service.getContacts().length).toBe(0);
  });
});
