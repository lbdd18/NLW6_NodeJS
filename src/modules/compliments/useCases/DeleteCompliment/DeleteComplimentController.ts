import {Request, Response} from "express"
import { container } from "tsyringe"

import { DeleteComplimentService } from "./DeleteComplimentService";

class DeleteComplimentController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const deleteComplimentService = container.resolve(DeleteComplimentService);

    const compliment = await deleteComplimentService.execute(id);

    return response.json(compliment);
  }
}

export { DeleteComplimentController }