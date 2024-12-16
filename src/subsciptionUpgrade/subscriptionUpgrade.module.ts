import { Module } from '@nestjs/common';
import { SubscriptionUpgradeService } from './service/SubscriptionUpgradeService';

@Module({
  imports: [],
  controllers: [],
  providers: [SubscriptionUpgradeService],
  exports: [SubscriptionUpgradeService],
})
export class SubscriptionUpgradeModule {}
