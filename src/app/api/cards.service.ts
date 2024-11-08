import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card, CardForm } from '../models/card/card.model';
import { Observable } from 'rxjs';
import { MovementApiResponse } from '../models/movement.model';
import { Transfer } from '../models/transfer.model';

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

  getCardMovements(cardId: string, limit: number, offset: number): Observable<MovementApiResponse> {
    return this.http.get<MovementApiResponse>(`http://localhost:3000/cards/${cardId}/movements?limit=${limit}&offset=${offset}`);
  }

  transferMoney(transferData: Transfer): Observable<boolean> {
    return this.http.post<boolean>(`http://localhost:3000/transfer`, transferData);
  }

}
