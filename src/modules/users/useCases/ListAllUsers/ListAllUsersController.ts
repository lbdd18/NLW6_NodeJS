import {Request, Response} from "express"
import { container } from "tsyringe";

import { ListAllUsersService } from "./ListAllUsersService";

class ListAllUsersController {
  async handle(request: Request, response: Response){

    const listAllUsersService = container.resolve(ListAllUsersService);

    const users = await listAllUsersService.execute();

    return response.json(users);
  }
}

export { ListAllUsersController }