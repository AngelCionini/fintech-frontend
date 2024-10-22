import { Component, EventEmitter, Output } from '@angular/core';
import { CardForm } from '../../../models/card/card.model';
import { NgForm } from '@angular/forms';
import { CardsService } from '../../../api/cards.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss',
})
export class NewCardComponent {
  constructor(private cardService: CardsService) {}

  @Output() close = new EventEmitter();

  @Output() cardAdded = new EventEmitter();

  card: CardForm = {
    name: '',
    surname: '',
    type: 'visa',
    number: '',
    csc: 0,
  };

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    this.card.type = form.value.tipo;
    this.card.name = form.value.nome;
    this.card.surname = form.value.cognome;
    this.card.number = form.value.numero;
    this.card.csc = form.value.codice;
    this.cardService.createNewCard(this.card).subscribe({
      next: () => {
        this.cardAdded.emit();
      },
      complete: () => {
        form.resetForm();
      },
    });
  }

  isValidSecurityCode(value: string): boolean {
    return /^\d{3}$/.test(value);
  }
}
