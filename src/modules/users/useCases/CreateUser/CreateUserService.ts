import { injectable, inject } from "tsyringe";
import { hash } from "bcryptjs"

import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";
import { User } from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories : IUsersRepositories){}

  public async execute({name, email, admin, password} : IRequest): Promise<User>{

    if(!email){
      throw new Error("Email incorrect!");
    }

    const userAlreadyExists = await this.usersRepositories.findByEmail(email);

    if(userAlreadyExists){
      throw new Error("User already exists!")
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepositories.create({name, email,admin, password: passwordHash});

    return user;
  }
}

export { CreateUserService };