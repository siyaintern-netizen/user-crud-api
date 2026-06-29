import { Employee } from '../employee.entity';

export abstract class IEmployeeRepository {
  abstract findAll(): Promise<Employee[]>;
  abstract findOne(id: number): Promise<Employee | null>;
  abstract create(employeeData: Partial<Employee>): Promise<Employee>;
  abstract update(id: number, employeeData: Partial<Employee>): Promise<void>;
  abstract remove(id: number): Promise<void>;
}
