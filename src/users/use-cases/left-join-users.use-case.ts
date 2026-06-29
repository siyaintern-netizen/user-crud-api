import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class LeftJoinUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(): Promise<User[]> {
    return this.userRepository.findAllWithLeftJoin();
  }
}
