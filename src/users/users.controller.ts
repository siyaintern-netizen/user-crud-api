import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get('left-join')
  getUsersWithEmployeesLeftJoin() {
    return this.usersService.getUsersWithEmployeesLeftJoin();
  }

  @Get('inner-join')
  getUsersWithEmployeesInnerJoin() {
    return this.usersService.getUsersWithEmployeesInnerJoin();
  }

  @Post()
  createUser(@Body() userData: Partial<User>) {
    return this.usersService.create(userData);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
  ) {
    return this.usersService.update(Number(id), userData);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}