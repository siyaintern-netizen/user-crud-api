import { Injectable } from '@nestjs/common';
import { Employee } from '../employee.entity';
import { IEmployeeRepository } from '../repositories/employee.repository.interface';

@Injectable()
export class FindOneEmployeeUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  execute(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOne(id);
  }
}
