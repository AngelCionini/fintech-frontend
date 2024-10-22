import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, CardForm } from '../models/card/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getAllCards() {
    return this.http.get<Card[]>('http://localhost:3000/cards');
  }

  createNewCard(cardForm: CardForm) {
    return this.http.post<CardForm>('http://localhost:3000/cards', cardForm);
  }

  deleteCard(id: string) {
    return this.http.delete('http://localhost:3000/cards/' + id);
  }
}
