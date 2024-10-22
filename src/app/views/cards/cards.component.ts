import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../api/cards.service';
import { Card, Movement } from '../../models/card/card.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  displayedColumns = ['creditCardIcon', 'name', 'deleteIcon'];

  constructor(private cardService: CardsService) {}

  ngOnInit() {
    this.loadCards();
  }

  deleteCard(id: string) {
    this.cardService.deleteCard(id).subscribe(() => {
      this.loadCards();
    });
  }

  loadCards() {
    this.cardService.getAllCards().subscribe((risultato) => {
      this.cards = risultato;
    });
  }

  onCardAdded() {
    this.loadCards();
  }
}
