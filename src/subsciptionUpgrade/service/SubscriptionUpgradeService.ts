import { Injectable } from '@nestjs/common';
import { SubscriptionDatabaseService } from 'src/db/service/SubscriptionDatabaseService';
import { SubscriptionRequest } from 'src/dto/SubscriptionRequest';
import { PaymentGatewayService } from 'src/paymentGateway/PaymentGatewayService';

@Injectable()
export class SubscriptionUpgradeService {
  constructor(
    private subscriptionDatabaseService: SubscriptionDatabaseService,
    private paymentGatewayService: PaymentGatewayService,
  ) {}

  async upgrade(subscriptionRequest: SubscriptionRequest): Promise<void> {
    const isValid = await this.paymentGatewayService.validateCard(
      subscriptionRequest.cardDetails,
    );
    if (isValid) {
      const paymentGatewayService = new PaymentGatewayService(
        'https://api.paymentgateway.com',
      );
      paymentGatewayService
        .processPayment(subscriptionRequest)
        .then((response) => {
          if (response.status == 'success') {
            //Upgrade subscription
          } else {
            throw new Error('Payment failure exception');
          }
        });
    } else {
      throw new Error('Invalid card details');
    }
  }
}