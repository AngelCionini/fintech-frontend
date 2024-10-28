import { Component, OnInit, ViewChild } from '@angular/core';
import { CardsService } from '../../api/cards.service';
import { Card} from '../../models/card/card.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  displayedColumns = ['creditCardIcon', 'name', 'movementsIcon', 'deleteIcon'];
  @ViewChild('drawer') drawer!: MatDrawer;
  loading = false;

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
    this.loading = true;
    this.cardService.getAllCards().subscribe((risultato) => {
      this.cards = risultato;
      this.loading = false;
    });
  }

  onCardAdded() {
    this.drawer.close();
    this.loadCards();
  }
}
