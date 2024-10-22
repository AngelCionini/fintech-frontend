export interface CardForm {
  name: string;
  surname: string;
  type: 'visa' | 'mastercard';
  number: string;
  csc: number;
}

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: 'visa' | 'mastercard';
  amount: number;
  movements?: Movement[];
}

export interface Movement {
  _id: string;
  type: 'in' | 'out',
  amount: number;
  title: string;
  description: string;
  timestamp: Date;
}