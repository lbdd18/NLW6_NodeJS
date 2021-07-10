import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListAllTagsService } from "./ListAllTagsService";

class ListAllTagsController {
  async handle(request: Request, response: Response){

    const listAllTagsService = container.resolve(ListAllTagsService);

    const tags = await listAllTagsService.execute();

    return response.json(tags);
  }
}

export { ListAllTagsController }