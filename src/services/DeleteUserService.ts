import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


class DeleteUserService {
  async execute(id: string){
    const usersRepository = getCustomRepository(UsersRepositories);

    const user = await usersRepository.findOne(id);

    if(!user){
      throw new Error("User does not exists!");
    }

    const result = await usersRepository.delete({id});

    return result;
  }
}

export { DeleteUserService };