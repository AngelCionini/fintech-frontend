import { Component, OnInit, signal } from '@angular/core';
import { Card } from '../../../models/card/card.model';
import { CardsService } from '../../../api/cards.service';
import { Movement, MovementApiResponse } from '../../../models/movement.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss',
})
export class MovementsComponent implements OnInit {
  constructor(
    private cardService: CardsService,
    private activatedRoute: ActivatedRoute
  ) {}

  cards: Card[] = [];
  movements: Movement[] = [];
  total!: number;
  displayedColumns = ['timestamp', 'amount', 'title', 'description'];
  limit: number = 5;
  offset: number = 0;
  selectedCard!: string;
  loading = false;
  readonly panelOpenState = signal(false);
  fullLimit!: number;
  disabled = false;

  ngOnInit(): void {
    this.loadCards();

    this.activatedRoute.paramMap.subscribe((params) => {
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
    this.loading = true;
    this.movements = [];
    this.offset = 0;
    this.selectedCard = cardId;
    this.total = 0;
    this.disabled = false;

    this.cardService
      .getCardMovements(cardId, this.limit, this.offset)
      .pipe(
        switchMap((res: MovementApiResponse) => {
          this.movements = res.data;
          return this.cardService.getCardMovements(
            cardId,
            res.total,
            this.offset
          );
        })
      )
      .subscribe((res) => {
        const allMoviments = res.data;
        allMoviments.forEach((moviment) => {
          if (moviment.type === 'in') {
            this.total += moviment.amount;
          } else {
            this.total -= moviment.amount;
          }
          this.loading = false;
          return this.total;
        });
      });
  }

  loadMoreMoviments(cardId: string) {
    this.loading = true;
    this.offset += this.limit;
    this.cardService
      .getCardMovements(cardId, this.limit, this.offset)
      .subscribe((risultato) => {
        if(risultato.data.length > 0) {
          this.movements = [...this.movements, ...risultato.data];
        } else {
          this.disabled = true;
        }
        this.loading = false;
      });
  }
}
