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
    if (
      !(await this.paymentGatewayService.validateCard(
        subscriptionRequest.cardDetails,
      ))
    ) {
      throw new Error('Invalid card details');
    }
    try {
      const response =
        await this.paymentGatewayService.processPayment(subscriptionRequest);
      if (response.status !== 'success') {
        throw new Error('Payment failure exception');
      }
      const subscription =
        await this.subscriptionDatabaseService.findByUserIdOrThrow(
          subscriptionRequest.userId,
        );
      subscription.id = subscriptionRequest.subscriptionId;
      // Annual subscription only
      subscription.expirationTs = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1),
      );
      await this.subscriptionDatabaseService.updateSubscription(subscription);
    } catch (error) {
      throw error;
    }
  }
}
