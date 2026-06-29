import { Injectable } from '@nestjs/common';
import { Employee } from '../employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { IEmployeeRepository } from '../repositories/employee.repository.interface';
import { FindOneEmployeeUseCase } from './find-one-employee.use-case';

@Injectable()
export class UpdateEmployeeUseCase {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
  ) {}

  async execute(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOneEmployeeUseCase.execute(id);
  }
}
