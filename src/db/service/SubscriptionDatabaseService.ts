import { Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../repository/SubscriptionRepository';
import { SubscriptionEntity } from '../entity/Subscription.entity';

@Injectable()
export class SubscriptionDatabaseService {
  constructor(private subscriptionRepository: SubscriptionRepository) {}

  async findByIdOrThrow(user_id: number): Promise<SubscriptionEntity> {
    const subscriptionEntity =
      await this.subscriptionRepository.findByUserId(user_id);
    if (!subscriptionEntity) {
      throw new NotFoundException(`Survey with user id ${user_id} not found`);
    }
    return subscriptionEntity;
  }

  async updateSubscription(
    subscriptionEntity: SubscriptionEntity,
  ): Promise<void> {
    await this.subscriptionRepository.save(subscriptionEntity);
  }
}
