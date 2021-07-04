import {Request, Response} from "express"
import { ListComplimentsByUserSenderService } from "../services/ListComplimentsByUserSenderService";

class ListComplimentsByUserSenderController {
  async handle(request: Request, response: Response){
    const { user_sender } = request.params;

    const listComplimentsByUserSenderService = new ListComplimentsByUserSenderService();

    const compliments = await listComplimentsByUserSenderService.execute(user_sender);

    return response.json(compliments);
  }
}

export { ListComplimentsByUserSenderController }