import {Request, Response} from "express"
import { DeleteComplimentService } from "../services/DeleteComplimentService";

class DeleteComplimentController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const deleteComplimentService = new DeleteComplimentService();

    const compliment = await deleteComplimentService.execute(id);

    return response.json(compliment);
  }
}

export { DeleteComplimentController }