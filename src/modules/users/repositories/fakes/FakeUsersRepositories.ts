import { v4 as uuid } from 'uuid'

import { IUsersRepositories } from '@modules/users/repositories/IUsersRepositories';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

import { User } from '@modules/users/infra/typeorm/entities/User'

class FakeUsersRepositories implements IUsersRepositories{
  private users: User[] = [];

  public async findAll(): Promise<User[]> {
    return this.users;
  }
  
  public async findByID(id: string): Promise<User> {
    return this.users.find(u => u.id === id);
  }
  
  public async findByEmail(email: string): Promise<User> {
    return this.users.find(u => u.email === email);
  }
  
  public async create({name, email, admin, password}: ICreateUserDTO): Promise<User> {
    const user = new User();
    user.id = uuid();
    user.name = name;
    user.email = email;
    user.admin = admin;
    user.password = password;
    this.users.push(user);
    return user;
  }
  
  public async delete(id: string): Promise<string> {
    const user = this.users.find(u=> u.id === id);
    const index = this.users.indexOf(user);
    this.users.splice(index);
    return id;
  }
  
  public async update({id, name, email, admin, password}: IUpdateUserDTO): Promise<User> {
    const user = this.users.find(u=> u.id === id);
    user.name = name;
    user.email = email;
    user.admin = admin;
    user.password = password;
    return user;
  }
}

export { FakeUsersRepositories } ;