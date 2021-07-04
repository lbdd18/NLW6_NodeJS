import {Request, Response} from "express"
import { ListTagByIDService } from "../services/ListTagByIDService";

class ListTagByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listTagByIDService = new ListTagByIDService();

    const tag = await listTagByIDService.execute(id);

    return response.json(tag);
  }
}

export { ListTagByIDController }