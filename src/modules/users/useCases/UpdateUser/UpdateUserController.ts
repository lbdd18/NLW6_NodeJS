import {Request, Response} from "express"
import { container } from "tsyringe";
import { UpdateUserService } from "./UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response){
    const { name, email, admin, password } = request.body;
    const { id } = request.params;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({id, name, email, admin, password});

    return response.json(user);
  }
}

export { UpdateUserController }