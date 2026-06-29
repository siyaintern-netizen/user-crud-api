import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

import { Employee } from './employee.entity';
import { User } from '../users/user.entity';
import { EmployeeRepository } from './repositories/employee.repository.implementation';
import { IEmployeeRepository } from './repositories/employee.repository.interface';
import { UsersModule } from '../users/users.module';
import { FindAllEmployeesUseCase } from './use-cases/find-all-employees.use-case';
import { CreateEmployeeUseCase } from './use-cases/create-employee.use-case';
import { FindOneEmployeeUseCase } from './use-cases/find-one-employee.use-case';
import { UpdateEmployeeUseCase } from './use-cases/update-employee.use-case';
import { DeleteEmployeeUseCase } from './use-cases/delete-employee.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, User]),
    UsersModule,
  ],
  controllers: [EmployeesController],
  providers: [
    EmployeesService,
    FindAllEmployeesUseCase,
    CreateEmployeeUseCase,
    FindOneEmployeeUseCase,
    UpdateEmployeeUseCase,
    DeleteEmployeeUseCase,
    {
      provide: IEmployeeRepository,
      useClass: EmployeeRepository,
    },
  ],
})
export class EmployeesModule {}
