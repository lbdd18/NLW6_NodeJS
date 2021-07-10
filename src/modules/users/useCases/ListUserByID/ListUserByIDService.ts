import { inject, injectable } from "tsyringe";

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";

@injectable()
class ListUserByIDService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories : IUsersRepositories){}

  public async execute(id: string): Promise<User>{

    const user = await this.usersRepositories.findByID(id);

    if(!user){
      throw new Error("User does not exists!")
    }

    return user;
  }
}

export { ListUserByIDService };