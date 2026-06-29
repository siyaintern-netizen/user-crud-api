import { Injectable } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  execute(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }
}
