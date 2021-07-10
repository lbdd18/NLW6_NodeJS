import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";
import { User } from "@modules/users/infra/typeorm/entities/User";

@injectable()
class ListAllUsersService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories: IUsersRepositories){}

  public async execute(): Promise<User[]>{
    const users = await this.usersRepositories.findAll();

    return users;
  }
}

export { ListAllUsersService };