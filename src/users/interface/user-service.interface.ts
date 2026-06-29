import { User } from "../user.entity";


export interface UsersServiceInterface {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User|null>;
  create(userData: Partial<User>): Promise<User>;
  update(id: number, userData: Partial<User>): Promise<User|null>;
  remove(id: number): Promise<void>;
}






