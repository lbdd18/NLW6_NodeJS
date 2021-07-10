import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListTagByIDService } from "./ListTagByIDService";

class ListTagByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listTagByIDService = container.resolve(ListTagByIDService);

    const tag = await listTagByIDService.execute(id);

    return response.json(tag);
  }
}

export { ListTagByIDController }