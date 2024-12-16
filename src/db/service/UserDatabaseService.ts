import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entity/User.entity';
import { UserRepository } from '../repository/UserRepository';
@Injectable()
export class UserDatabaseService {
  constructor(private userRepository: UserRepository) {}

  async getUserFullName(userIds: number[]): Promise<Record<number, string>> {
    const userEntities = await this.userRepository.findByIds(userIds);
    return userEntities.reduce((acc: Record<number, string>, user) => {
      acc[user.id] = user.fName + ' ' + user.lName;
      return acc;
    }, {});
  }

  async getByIdOrThrow(userId: number): Promise<UserEntity> {
    return this.userRepository.getByIdOrThrow(userId);
  }
}
