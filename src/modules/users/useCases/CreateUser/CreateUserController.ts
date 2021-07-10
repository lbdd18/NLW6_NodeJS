import {Request, Response} from "express"
import { container } from "tsyringe";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response){
    const {name, email, admin, password} = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({name, email, admin, password});

    return response.json(user);
  }
}

export { CreateUserController }