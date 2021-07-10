import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";

import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";

interface IRequest{
  email: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepositories")
    private usersRepositories: IUsersRepositories){}

  public async execute({email, password}: IRequest) : Promise<string>{

    const user = await this.usersRepositories.findByEmail(email);
    
    if(!user){
      throw new Error("Email/Password incorrect");
    }
    
    const passwordCheck = await compare(password, user.password);

    if(!passwordCheck){
      throw new Error("Email/Password incorrect");
    }

    const token = sign({
      email: user.email
    }, "1171cc284f1d008aa16c16e3e994b157", {
      subject: user.id, 
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService }