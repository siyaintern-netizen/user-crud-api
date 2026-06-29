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
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  getEmployees() {
    return this.employeesService.findAll();
  }

  @Post()
  createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get(':id')
  getEmployee(@Param('id') id: string) {
    return this.employeesService.findOne(Number(id));
  }

  @Put(':id')
  updateEmployee(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(Number(id), updateEmployeeDto);
  }

  @Delete(':id')
  deleteEmployee(@Param('id') id: string) {
    return this.employeesService.remove(Number(id));
  }
}
