import {Request, Response} from "express"
import { ListUserByIDService } from "../services/ListUserByIDService";

class ListUserByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listUserByID = new ListUserByIDService();

    const user = await listUserByID.execute({user_id: id});

    return response.json(user);
  }
}

export { ListUserByIDController }