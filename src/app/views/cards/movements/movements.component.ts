import { Component, OnInit} from '@angular/core';
import { Card } from '../../../models/card/card.model';
import { CardsService } from '../../../api/cards.service';
import { Movement, MovementApiResponse } from '../../../models/movement.model';
import { ActivatedRoute } from '@angular/router';
import { delay, map, switchMap } from 'rxjs';

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
  selectedCard!: Card;
  loading = false;
  panelOpenState = false;
  disabled = false;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const cardId = params.get('cardId');
      if (cardId) {
        this.cardService.getAllCards()
          .pipe(
            map((res) => {
              this.cards = res; 
            })
          )
          .subscribe(() => {
            const selectedCard = this.cards.find(x => x._id === cardId);
            if(selectedCard) {
              this.selectedCard = selectedCard;
            }
            this.onCardSelect(this.selectedCard);
          });
      } else {
        this.loadCards();
      }
    });
  }

  loadCards() {
    this.cardService.getAllCards().subscribe((risultato) => {
      this.cards = risultato;
    });
  }

  onCardSelect(card: Card) {
    this.loading = true;
    this.movements = [];
    this.offset = 0;
    this.selectedCard = card;
    this.total = card.amount;
    this.disabled = false;

    this.cardService.getCardMovements(card._id, this.limit, this.offset)
    .pipe(
      delay(500)
    )
    .subscribe(
      (res: MovementApiResponse) => {
        this.movements = res.data;
        this.loading = false;
      });
    }

/*    this.cardService.getAllCards()
    .pipe(
      switchMap(
        (allCards: Card[]) => {
          const card = allCards.find( x => x._id === cardId);
          this.total = card?.amount || 0;
          return this.cardService.getCardMovements(cardId, this.limit, this.offset);
        }),
        delay(500)
      )
    .subscribe(
      (res: MovementApiResponse) => {
        this.movements = res.data;
        this.loading = false;
      });
  }*/

  loadMoreMoviments(card: Card) {
    this.loading = true;
    this.offset += this.limit;
    this.cardService
      .getCardMovements(card._id, this.limit, this.offset)
      .pipe(
        delay(500)
      )
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
