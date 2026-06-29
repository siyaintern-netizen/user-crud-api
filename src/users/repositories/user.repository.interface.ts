import { User } from '../user.entity';

export abstract class IUserRepository {
  abstract findAll(): Promise<User[]>;
  abstract findOne(id: number): Promise<User | null>;
  abstract create(userData: Partial<User>): Promise<User>;
  abstract update(id: number, userData: Partial<User>): Promise<void>;
  abstract remove(id: number): Promise<void>;
  abstract findAllWithLeftJoin(): Promise<User[]>;
  abstract findAllWithInnerJoin(): Promise<User[]>;
}
