import {Request, Response} from "express"
import { ListAllTagsService } from "../services/ListAllTagsService";

class ListAllTagsController {
  async handle(request: Request, response: Response){

    const listAllTagsService = new ListAllTagsService();

    const tags = await listAllTagsService.execute();

    return response.json(tags);
  }
}

export { ListAllTagsController }