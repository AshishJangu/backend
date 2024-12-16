import { BaseEntity } from 'src/mysql/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'subscription' })
export class SubscriptionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({
    name: 'creation_ts',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationTs: Date;

  @Column({
    name: 'expiration_ts',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expirationTs: Date;
}
