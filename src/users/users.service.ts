import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersServiceInterface } from './interface/user-service.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService implements UsersServiceInterface {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { employees: true } });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { employees: true },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User|null> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Fetch users together with their employees using a LEFT JOIN.
  getUsersWithEmployeesLeftJoin(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employees', 'employee')
      .getMany();
  }

  // Fetch users together with their employees using an INNER JOIN.
  // Unlike LEFT JOIN, INNER JOIN returns only users that have at least one employee.
  getUsersWithEmployeesInnerJoin(): Promise<User[]> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.employees', 'employee')
      .getMany();
  }
}