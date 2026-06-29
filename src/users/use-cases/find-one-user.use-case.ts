import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class FindOneUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }
}
