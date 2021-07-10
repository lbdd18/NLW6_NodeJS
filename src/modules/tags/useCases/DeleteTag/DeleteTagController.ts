import {Request, Response} from "express"
import { container } from "tsyringe";
import { DeleteTagService } from "./DeleteTagService";

class DeleteTagController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const deleteTagService = container.resolve(DeleteTagService);

    const tag = await deleteTagService.execute(id);

    return response.json(tag);
  }
}

export { DeleteTagController }