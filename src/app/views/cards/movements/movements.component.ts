import { Component, OnInit } from '@angular/core';
import { Card } from '../../../models/card/card.model';
import { CardsService } from '../../../api/cards.service';
import { Movement } from '../../../models/movement.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss'
})
export class MovementsComponent implements OnInit{
  constructor(
    private cardService: CardsService,
    private activatedRoute: ActivatedRoute) {}

  cards: Card[] = [];
  movements: Movement[] = [];
  total!: number;
  displayedColumns = ['timestamp', 'amount', 'title', 'description'];
  limit: number = 5;
  offset: number = 0;
  selectedCard!: string;

  ngOnInit(): void {
    this.loadCards();

    this.activatedRoute.paramMap.subscribe(
      (params) => {
        const cardId = params.get('cardId');
      if (cardId) {
        this.selectedCard = cardId;
        this.onCardSelect(cardId);
      }
    });
  }

  loadCards() {
    this.cardService.getAllCards().subscribe((risultato) => {
      this.cards = risultato;
    });
  }

  onCardSelect(cardId: string) {
    this.movements = [];
    this.offset = 0;
    this.selectedCard = cardId;

    
    this.cardService.getCardMovements(cardId, this.limit, this.offset).subscribe(
      (risultato) => {
        this.movements = risultato.data;
        this.total = risultato.total;
        
      }
    )
  }

  loadMoreMoviments(cardId: string) {
    this.offset += this.limit;
    this.cardService.getCardMovements(cardId, this.limit, this.offset).subscribe(
      (risultato) => {
        this.movements = [...this.movements, ...risultato.data];
      }
    )
  }
}
