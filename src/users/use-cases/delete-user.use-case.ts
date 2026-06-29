import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(id: number): Promise<void> {
    return this.userRepository.remove(id);
  }
}
