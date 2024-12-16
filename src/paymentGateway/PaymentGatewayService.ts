import { Card } from 'src/dto/Card';
import { SubscriptionRequest } from 'src/dto/SubscriptionRequest';
import { CARD_TYPE } from 'src/enum/CardTypeEnum';
import { CreditCardValidator } from 'src/validator/CreditCardValidator';

// PaymentGatewayService class
export class PaymentGatewayService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async processPayment(subscriptionRequest: SubscriptionRequest): Promise<any> {
    const response = await fetch(`${this.apiUrl}/process-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: subscriptionRequest,
      }),
    });
    return response.json();
  }

  async validateCard(card: Card): Promise<any> {
    if (card.type == CARD_TYPE.DEBIT_CARD) {
      // Debit card implementation
    }
    if (card.type == CARD_TYPE.CREDIT_CARD)
      return new CreditCardValidator().validate(card);
    // Default implementation
    return new CreditCardValidator().validate(card);
  }

  async getPaymentStatus(transactionId: string): Promise<any> {
    const response = await fetch(
      `${this.apiUrl}/payment-status/${transactionId}`,
      {
        method: 'GET',
      },
    );
    return response.json();
  }
}

export interface ValidationResponse {
  isValid: boolean;
  message: string;
}
