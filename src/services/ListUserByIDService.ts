import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "../repositories/UsersRepositories";

class ListUserByIDService {
  async execute({user_id}){
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne({id:user_id});

    if(!user){
      throw new Error("User does not exists!")
    }

    return user;
  }
}

export { ListUserByIDService };