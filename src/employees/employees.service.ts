import { Injectable } from '@nestjs/common';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FindAllEmployeesUseCase } from './use-cases/find-all-employees.use-case';
import { CreateEmployeeUseCase } from './use-cases/create-employee.use-case';
import { FindOneEmployeeUseCase } from './use-cases/find-one-employee.use-case';
import { UpdateEmployeeUseCase } from './use-cases/update-employee.use-case';
import { DeleteEmployeeUseCase } from './use-cases/delete-employee.use-case';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly findAllEmployeesUseCase: FindAllEmployeesUseCase,
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
    private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.findAllEmployeesUseCase.execute();
  }

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.createEmployeeUseCase.execute(createEmployeeDto);
  }

  findOne(id: number): Promise<Employee | null> {
    return this.findOneEmployeeUseCase.execute(id);
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    return this.updateEmployeeUseCase.execute(id, updateEmployeeDto);
  }

  remove(id: number): Promise<void> {
    return this.deleteEmployeeUseCase.execute(id);
  }
}
