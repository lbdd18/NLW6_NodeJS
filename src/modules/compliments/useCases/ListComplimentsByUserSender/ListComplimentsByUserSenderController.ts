import {Request, Response} from "express"
import { container } from "tsyringe";
import { ListComplimentsByUserSenderService } from "./ListComplimentsByUserSenderService";

class ListComplimentsByUserSenderController {
  async handle(request: Request, response: Response){
    const { user_sender } = request.params;

    const listComplimentsByUserSenderService = container.resolve(ListComplimentsByUserSenderService);

    const compliments = await listComplimentsByUserSenderService.execute(user_sender);

    return response.json(compliments);
  }
}

export { ListComplimentsByUserSenderController }