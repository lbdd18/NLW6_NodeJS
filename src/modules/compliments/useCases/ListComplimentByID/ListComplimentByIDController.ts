import { Request, Response } from "express"
import { container } from "tsyringe"

import { ListComplimentByIDService } from "./ListComplimentByIDService";

class ListComplimentByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listComplimentByIDService = container.resolve(ListComplimentByIDService);

    const compliment = await listComplimentByIDService.execute(id);

    return response.json(compliment);
  }
}

export { ListComplimentByIDController }