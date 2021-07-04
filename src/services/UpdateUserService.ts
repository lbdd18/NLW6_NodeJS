import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs"

import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
  id: string;
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class UpdateUserService {
  async execute({id, name, email, admin, password} : IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);

    if(!name){
      throw new Error("Name incorrect!");
    }

    if(!email){
      throw new Error("Email incorrect!");
    }

    if(!password){
      throw new Error("Password incorrect!");
    }

    const user = await usersRepository.findOne({id});

    if(!user){
      throw new Error("User does not exists!");
    }

    user.name = name;
    user.email = email;
    user.admin = admin;
    user.password = await hash(password, 8);

    await usersRepository.save(user);

    return user;
  }
}

export { UpdateUserService };