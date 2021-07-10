import { injectable, inject } from "tsyringe";
import { hash } from "bcryptjs"

import { User } from "@modules/users/infra/typeorm/entities/User";
import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";

interface IRequest {
  id: string;
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories: IUsersRepositories){}

  public async execute({id, name, email, admin, password} : IRequest): Promise<User>{

    if(!name){
      throw new Error("Name incorrect!");
    }

    if(!email){
      throw new Error("Email incorrect!");
    }

    if(!password){
      throw new Error("Password incorrect!");
    }

    const user = await this.usersRepositories.findByID(id);

    if(!user){
      throw new Error("User does not exists!");
    }

    const passwordHash = await hash(password, 8);

    const updatedUser = await this.usersRepositories.update({id, name, email, admin, password: passwordHash});

    return updatedUser;
  }
}

export { UpdateUserService };