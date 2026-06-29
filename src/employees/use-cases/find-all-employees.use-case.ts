import { Injectable } from '@nestjs/common';
import { Employee } from '../employee.entity';
import { IEmployeeRepository } from '../repositories/employee.repository.interface';

@Injectable()
export class FindAllEmployeesUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  execute(): Promise<Employee[]> {
    return this.employeeRepository.findAll();
  }
}
