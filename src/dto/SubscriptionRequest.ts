import { SubscriptionType } from 'src/enum/SubscriptionEnum';
import { Card } from './Card';

export class SubscriptionRequest {
  cardDetails: Card;
  amount: number;
  subscriptionId: SubscriptionType;
  userId: number;

  constructor(
    card: Card,
    amount: number,
    subscriptionId: SubscriptionType,
    userId: number,
  ) {
    this.cardDetails = card;
    this.amount = amount;
    this.subscriptionId = subscriptionId;
    this.userId = userId;
  }
}
