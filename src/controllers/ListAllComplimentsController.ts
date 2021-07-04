import {Request, Response} from "express"

import { ListAllComplimentsService } from "../services/ListAllComplimentsService";

class ListAllComplimentsController {
  async handle(request: Request, response: Response){

    const listAllComplimentsService = new ListAllComplimentsService();

    const compliments = await listAllComplimentsService.execute();

    return response.json(compliments);
  }
}

export { ListAllComplimentsController }