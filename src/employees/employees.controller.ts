import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Post()
  createEmployee(@Body() employeeData: Partial<Employee>) {
    return this.employeesService.create(employeeData);
  }

  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.findOne(Number(id));
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() employeeData: Partial<Employee>,
  ) {
    return this.employeesService.update(Number(id), employeeData);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.remove(Number(id));
  }
}
