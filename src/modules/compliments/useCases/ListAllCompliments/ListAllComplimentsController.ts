import { Request, Response } from "express"
import { container } from 'tsyringe'

import { ListAllComplimentsService } from "./ListAllComplimentsService";

class ListAllComplimentsController {
  async handle(request: Request, response: Response){

    const listAllComplimentsService = container.resolve(ListAllComplimentsService);

    const compliments = await listAllComplimentsService.execute();

    return response.json(compliments);
  }
}

export { ListAllComplimentsController }