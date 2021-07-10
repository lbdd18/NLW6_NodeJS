import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";

@injectable()
class DeleteUserService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories: IUsersRepositories){}

  public async execute(id: string): Promise<string>{

    const user = await this.usersRepositories.findByID(id);

    if(!user){
      throw new Error("User does not exists!");
    }

    await this.usersRepositories.delete(id);

    return id;
  }
}

export { DeleteUserService };