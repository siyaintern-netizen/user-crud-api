import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersServiceInterface } from './interface/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { LeftJoinUsersUseCase } from './use-cases/left-join-users.use-case';
import { InnerJoinUsersUseCase } from './use-cases/inner-join-users.use-case';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly leftJoinUsersUseCase: LeftJoinUsersUseCase,
    private readonly innerJoinUsersUseCase: InnerJoinUsersUseCase,
  ) {}

  findAll(): Promise<User[]> {
    return this.findAllUsersUseCase.execute();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.createUserUseCase.execute(createUserDto);
  }

  findOne(id: number): Promise<User | null> {
    return this.findOneUserUseCase.execute(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.updateUserUseCase.execute(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    return this.deleteUserUseCase.execute(id);
  }

  getUsersWithEmployeesLeftJoin(): Promise<User[]> {
    return this.leftJoinUsersUseCase.execute();
  }

  getUsersWithEmployeesInnerJoin(): Promise<User[]> {
    return this.innerJoinUsersUseCase.execute();
  }
}