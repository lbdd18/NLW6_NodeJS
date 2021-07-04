import { getCustomRepository } from "typeorm"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({email});
    
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