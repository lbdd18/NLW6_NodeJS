import { EntityRepository, getRepository, Repository } from 'typeorm'

import { User } from '@modules/users/infra/typeorm/entities/User'

import { IUsersRepositories } from '@modules/users/repositories/IUsersRepositories';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUpdateUserDTO } from '@modules/users/dtos/IUpdateUserDTO';

@EntityRepository(User)
class UsersRepositories implements IUsersRepositories{
  private ormRepository: Repository<User>;

  constructor(){
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findByID(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({email});
    return user;
  }

  public async create({name, email, admin, password}: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({name, email, admin, password});
    await this.ormRepository.save(user);
    return user;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);
    return id;
  }

  public async update({id, name, email, admin, password}: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    
    user.name = name;
    user.email = email;
    user.admin = admin;
    user.password = password;

    await this.ormRepository.save(user);
    
    return user;
  }

}

export { UsersRepositories } ;