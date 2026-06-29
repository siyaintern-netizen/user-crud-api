import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserRepository } from './repositories/user.repository.implementation';
import { IUserRepository } from './repositories/user.repository.interface';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { FindOneUserUseCase } from './use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';
import { LeftJoinUsersUseCase } from './use-cases/left-join-users.use-case';
import { InnerJoinUsersUseCase } from './use-cases/inner-join-users.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    FindAllUsersUseCase,
    CreateUserUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    LeftJoinUsersUseCase,
    InnerJoinUsersUseCase,
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
  ],
  exports: [IUserRepository],
})        
export class UsersModule {}
