import {Request, Response} from "express"
import { container } from "tsyringe";

import { CreateTagService } from "./CreateTagService";

class CreateTagController {
  async handle(request: Request, response: Response){
    const {name} = request.body;

    const createTagService = container.resolve(CreateTagService);

    const tag = await createTagService.execute({name});

    return response.json(tag);
  }
}

export { CreateTagController }