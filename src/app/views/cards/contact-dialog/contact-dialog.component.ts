import { Component, OnInit } from '@angular/core';
import { Contact } from '../../../models/contact.model';
import { ContactService } from '../../../api/contact.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrl: './contact-dialog.component.scss'
})
export class ContactDialogComponent implements OnInit{

  constructor(private contactService: ContactService, private dialog: MatDialog, private router: Router, private dialogRef: MatDialogRef<ContactDialogComponent>) {}

  displayedColumns: string[] = ['contactIcon', 'contact', 'selectIcon', 'modifyIcon', 'deleteIcon'];
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];

  ngOnInit() {
    this.loadContacts()
  }

  loadContacts() {
    this.contactService.getAllContacts().subscribe(
      (res) => {
        this.contacts = res;
        this.filteredContacts = res;
      }
    )
  }

  onClickNewContact() {
    const dialogRef = this.dialog.open(NewContactDialogComponent);
    dialogRef.afterClosed().subscribe(
      (res) => {
        if(res) {
          this.loadContacts()
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    
    this.filteredContacts = this.contacts.filter(
      contact => 
      contact.name.toLowerCase().includes(filterValue) ||
      contact.surname.toLowerCase().includes(filterValue) ||
      contact.iban.toLowerCase().includes(filterValue)
    );
  }

  checkContact(contact: Contact) {
    this.dialogRef.close(contact);
  }
  

  modifyContact(contact: Contact) {
    this.dialog.open(NewContactDialogComponent, {
      data: contact
    })
  }

  deleteContact(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe();
    this.loadContacts();
  }
}
