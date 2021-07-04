import {Request, Response} from "express"
import { UpdateTagService } from "../services/UpdateTagService";

class UpdateTagController {
  async handle(request: Request, response: Response){
    const { name} = request.body;
    const { id } = request.params;

    const updateTagService = new UpdateTagService();

    const tag = await updateTagService.execute({id, name});

    return response.json(tag);
  }
}

export { UpdateTagController }