import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CardsService } from '../../../api/cards.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrl: './new-card.component.scss'
})
export class NewCardComponent {

  constructor(private cardService: CardsService) {}

  @Output() close = new EventEmitter();

  @Output() cardAdded = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onSubmit(form: NgForm) {
    this.cardService.createNewCard(form.value).subscribe({
      next: () => {
        this.cardAdded.emit();
      },
      complete: () => {
        form.resetForm();
      }
    });
  }

  isValidSecurityCode(value: string): boolean {
    return /^\d{3}$/.test(value);
  }

}
