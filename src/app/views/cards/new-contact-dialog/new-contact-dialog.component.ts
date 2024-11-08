import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../../../api/contact.service';
import { Contact } from '../../../models/contact.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrl: './new-contact-dialog.component.scss'
})
export class NewContactDialogComponent implements OnInit{

  constructor(
    private contactService: ContactService,
    private dialog: MatDialogRef<NewContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {}

  ngOnInit() {
    if (!this.data) {
      this.data = {
        _id: '',
        name: '',
        surname: '',
        iban: ''
      };
    }
  }

  onSubmit(form: NgForm) {
    if(this.data._id) {
      const updatedContact = {
        ...this.data,
        ...form.value
      };
      this.contactService.editContact(updatedContact).subscribe();
    } else {
      this.contactService.createNewContact(form.value).subscribe();
    }
    
    this.dialog.close(true);
  }

}
