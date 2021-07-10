import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'

import { User } from '../infra/typeorm/entities/User'

interface IUsersRepositories{
  findAll(): Promise<User[]>
  findByID(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  update(data: IUpdateUserDTO): Promise<User>;
}

export { IUsersRepositories }