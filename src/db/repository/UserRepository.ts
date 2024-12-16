import { Inject, Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { UserEntity } from '../entity/User.entity';
import { DEFAULT_DATA_SOURCE } from 'src/mysql/constants/database.constants';

export const userRepositoryProvider = {
  provide: 'USER_REPOSITORY',
  useFactory: (dataSource: DataSource): Repository<UserEntity> =>
    dataSource.getRepository(UserEntity),
  inject: [DEFAULT_DATA_SOURCE],
};

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async save(userEntity: UserEntity): Promise<UserEntity> {
    return await this.userRepository.save(userEntity);
  }

  async findByIds(userIds: number[]): Promise<UserEntity[]> {
    return await this.userRepository.findBy({ id: In(userIds) });
  }

  async getByIdOrThrow(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOneByOrFail({ id: userId });
  }
}
