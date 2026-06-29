import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private typeOrmRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.typeOrmRepository.find({ relations: { employees: true } });
  }

  findOne(id: number): Promise<User | null> {
    return this.typeOrmRepository.findOne({
      where: { id },
      relations: { employees: true },
    });
  }

  create(userData: Partial<User>): Promise<User> {
    const user = this.typeOrmRepository.create(userData);
    return this.typeOrmRepository.save(user);
  }

  async update(id: number, userData: Partial<User>): Promise<void> {
    await this.typeOrmRepository.update(id, userData);
  }

  async remove(id: number): Promise<void> {
    await this.typeOrmRepository.delete(id);
  }

  findAllWithLeftJoin(): Promise<User[]> {
    return this.typeOrmRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.employees', 'employee')
      .getMany();
  }

  findAllWithInnerJoin(): Promise<User[]> {
    return this.typeOrmRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.employees', 'employee')
      .getMany();
  }
}
