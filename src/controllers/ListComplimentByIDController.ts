import {Request, Response} from "express"
import { ListComplimentByIDService } from "../services/ListComplimentByIDService";

class ListComplimentByIDController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const listComplimentByIDService = new ListComplimentByIDService();

    const compliment = await listComplimentByIDService.execute(id);

    return response.json(compliment);
  }
}

export { ListComplimentByIDController }