import {Request, Response} from "express"
import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response){
    const { name, email, admin, password } = request.body;
    const { id } = request.params;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({id, name, email, admin, password});

    return response.json(user);
  }
}

export { UpdateUserController }