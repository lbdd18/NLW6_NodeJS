import {Request, Response} from "express"
import { container } from "tsyringe";

import { CreateComplimentService } from "./CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response){
    const {tag_id, user_receiver, message} = request.body;
    const user_sender = request.user_id;

    const createComplimentService = container.resolve(CreateComplimentService);

    const compliment = await createComplimentService.execute({tag_id, user_sender, user_receiver, message});

    return response.json(compliment);
  }
}

export { CreateComplimentController }