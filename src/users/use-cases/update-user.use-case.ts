import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUserRepository } from '../repositories/user.repository.interface';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOneUserUseCase.execute(id);
  }
}
