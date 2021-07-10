import {Request, Response, NextFunction} from "express"
import { getCustomRepository } from "typeorm";

import { UsersRepositories } from "@modules/users/infra/typeorm/repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction){
  const { user_id } = request;

  const usersRepository = getCustomRepository(UsersRepositories);

  const user = await usersRepository.findByID(user_id);

  if(user.admin){
    return next();
  }

  return response.status(401).json({
    error: "User Unauthorized"
  });
}