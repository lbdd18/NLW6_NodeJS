import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListComplimentsByUserReceiverService } from "./ListComplimentsByUserReceiverService";

class ListComplimentsByUserReceiverController {
  async handle(request: Request, response: Response){
    const { user_receiver } = request.params;
    
    const listComplimentsByUserReceiverService = container.resolve(ListComplimentsByUserReceiverService);

    const compliments = await listComplimentsByUserReceiverService.execute(user_receiver);

    return response.json(compliments);
  }
}

export { ListComplimentsByUserReceiverController }