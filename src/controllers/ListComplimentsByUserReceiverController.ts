import {Request, Response} from "express"
import { ListComplimentsByUserReceiverService } from "../services/ListComplimentsByUserReceiverService";

class ListComplimentsByUserReceiverController {
  async handle(request: Request, response: Response){
    const { user_receiver } = request.params;

    const listComplimentsByUserReceiverService = new ListComplimentsByUserReceiverService();

    const compliments = await listComplimentsByUserReceiverService.execute(user_receiver);

    return response.json(compliments);
  }
}

export { ListComplimentsByUserReceiverController }