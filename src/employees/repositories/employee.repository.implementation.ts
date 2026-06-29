import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../employee.entity';
import { IEmployeeRepository } from './employee.repository.interface';

@Injectable()
export class EmployeeRepository implements IEmployeeRepository {
  constructor(
    @InjectRepository(Employee)
    private typeOrmRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.typeOrmRepository.find();
  }

  findOne(id: number): Promise<Employee | null> {
    return this.typeOrmRepository.findOneBy({ id });
  }

  create(employeeData: Partial<Employee>): Promise<Employee> {
    const employee = this.typeOrmRepository.create(employeeData);
    return this.typeOrmRepository.save(employee);
  }

  async update(id: number, employeeData: Partial<Employee>): Promise<void> {
    await this.typeOrmRepository.update(id, employeeData);
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }
}
