import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { User } from '../users/user.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { userId, ...employeeFields } = createEmployeeDto;

    const employee = this.employeeRepository.create(employeeFields);

    if (userId) {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      employee.user = user;
      employee.userId = userId;
    }

    return this.employeeRepository.save(employee);
  }

  findOne(id: number): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ id });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
