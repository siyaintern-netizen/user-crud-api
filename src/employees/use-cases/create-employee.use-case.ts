import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from '../employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { IEmployeeRepository } from '../repositories/employee.repository.interface';
import { IUserRepository } from '../../users/repositories/user.repository.interface';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { userId, ...employeeFields } = createEmployeeDto;
    const employeeData: Partial<Employee> = { ...employeeFields };

    if (userId) {
      const user = await this.userRepository.findOne(userId);

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      employeeData.userId = userId;
    }

    return this.employeeRepository.create(employeeData);
  }
}
