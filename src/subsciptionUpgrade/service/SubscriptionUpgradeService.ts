import { Injectable } from '@nestjs/common';
import { SubscriptionDatabaseService } from 'src/db/service/SubscriptionDatabaseService';
import { SubscriptionRequest } from 'src/dto/SubscriptionRequest';
import { CustomErrorHandlerService } from 'src/errorHandler/CustomErrorHandlerService';
import { PaymentGatewayService } from 'src/paymentGateway/PaymentGatewayService';

@Injectable()
export class SubscriptionUpgradeService {
  constructor(
    private subscriptionDatabaseService: SubscriptionDatabaseService,
    private paymentGatewayService: PaymentGatewayService,
    private errorHandlerService: CustomErrorHandlerService,
  ) {}

  async upgrade(subscriptionRequest: SubscriptionRequest): Promise<void> {
    try {
      if (
        !(await this.paymentGatewayService.validateCard(
          subscriptionRequest.cardDetails,
        ))
      ) {
        throw new Error('Invalid card details');
      }
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
      this.errorHandlerService.handleError(error);
    }
  }
}
