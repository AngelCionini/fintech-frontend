import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from '../contact-dialog/contact-dialog.component';
import { NgForm } from '@angular/forms';
import { Card } from '../../../models/card/card.model';
import { CardsService } from '../../../api/cards.service';
import { Contact } from '../../../models/contact.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trasferimenti',
  templateUrl: './trasferimenti.component.html',
  styleUrl: './trasferimenti.component.scss',
})
export class TrasferimentiComponent implements OnInit {
  constructor(private dialog: MatDialog, private cardService: CardsService) {}

  private snackBar = inject(MatSnackBar);

  contact: Contact = {
    _id: '',
    name: '',
    surname: '',
    iban: '',
  };
  cards: Card[] = [];

  ngOnInit() {
    this.cardService.getAllCards().subscribe((res) => {
      this.cards = res;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ContactDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.contact = res;
      }
    });
  }

  onSubmit(form: NgForm) {
    this.cardService.transferMoney(form.value).subscribe(() => {
      const snackBarRef = this.snackBar.open('Trasferimento completato con successo!', '', {
        duration: 2000,
      });
      snackBarRef.afterDismissed().subscribe(
        () => {
          location.reload();
        }
      )
    });
  }
}
