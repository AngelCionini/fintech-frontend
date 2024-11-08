import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`http://localhost:3000/contacts`);
  }

  createNewContact(newContact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(`http://localhost:3000/contacts`, newContact);
  }

  editContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`http://localhost:3000/contacts/${contact._id}`,
    contact);
  }

  deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(`http://localhost:3000/contacts/${contactId}`);
  }

}
