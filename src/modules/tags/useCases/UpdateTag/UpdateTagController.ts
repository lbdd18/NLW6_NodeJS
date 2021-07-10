import {Request, Response} from "express"
import { container } from "tsyringe";
import { UpdateTagService } from "./UpdateTagService";

class UpdateTagController {
  async handle(request: Request, response: Response){
    const { name} = request.body;
    const { id } = request.params;

    const updateTagService = container.resolve(UpdateTagService);

    const tag = await updateTagService.execute({id, name});

    return response.json(tag);
  }
}

export { UpdateTagController }