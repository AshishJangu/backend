import { Inject, Injectable } from '@nestjs/common';
import { DEFAULT_DATA_SOURCE } from 'src/mysql/constants/database.constants';
import { SubscriptionEntity } from '../entity/Subscription.entity';
import { Repository } from 'typeorm/repository/Repository';
import { DataSource } from 'typeorm';

export const userRepositoryProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource): Repository<SubscriptionEntity> =>
    dataSource.getRepository(SubscriptionEntity),
  inject: [DEFAULT_DATA_SOURCE],
};

@Injectable()
export class SubscriptionRepository {
  constructor(
    @Inject('SUBSCRIPTION_REPOSITORY')
    private subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async save(
    subscriptionEntity: SubscriptionEntity,
  ): Promise<SubscriptionEntity> {
    return await this.subscriptionRepository.save(subscriptionEntity);
  }

  async findById(id: number): Promise<SubscriptionEntity | null> {
    return await this.subscriptionRepository.findOneBy({ id: id });
  }

  async findByUserId(userId: number): Promise<SubscriptionEntity | null> {
    return await this.subscriptionRepository.findOneBy({ userId: userId });
  }

  async getByIdOrThrow(id: number): Promise<SubscriptionEntity> {
    return await this.subscriptionRepository.findOneByOrFail({ id: id });
  }
}
