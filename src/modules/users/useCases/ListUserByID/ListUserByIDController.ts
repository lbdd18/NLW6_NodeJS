import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListUserByIDService } from "./ListUserByIDService";

class ListUserByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listUserByID = container.resolve(ListUserByIDService);

    const user = await listUserByID.execute(id);

    return response.json(user);
  }
}

export { ListUserByIDController }