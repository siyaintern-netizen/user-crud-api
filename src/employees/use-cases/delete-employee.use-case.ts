import { Injectable } from '@nestjs/common';
import { IEmployeeRepository } from '../repositories/employee.repository.interface';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  execute(id: number): Promise<void> {
    return this.employeeRepository.remove(id);
  }
}
