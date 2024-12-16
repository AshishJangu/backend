import { BaseEntity } from 'src/mysql/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'app_user' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'fname' })
  fName: string;

  @Column({ name: 'lname' })
  lName: string;

  @Column({ name: 'phone_verification', default: 0 })
  phoneVerificationStatus: number;

  @Column({
    name: 'creation_date',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;

  @Column({ name: 'country', default: 'USA' })
  country: string;
}
