import {Request, Response} from "express"
import { UpdateComplimentService } from "../services/UpdateComplimentService";

class UpdateComplimentController {
  async handle(request: Request, response: Response){
    const { tag_id, user_receiver, message } = request.body;
    const { id } = request.params;
    const user_sender = request.user_id;

    const updateComplimentService = new UpdateComplimentService();

    const compliment = await updateComplimentService.execute({id, tag_id, user_sender, user_receiver, message});

    return response.json(compliment);
  }
}

export { UpdateComplimentController }