import { inject, injectable } from "tsyringe";

import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";

import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";
import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";

interface IRequest {
  id: string;
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

@injectable()
class UpdateComplimentService {
  constructor(
    @inject("ComplimentsRepositories")
    private complimentsRepositories: IComplimentsRepositories,
    @inject("UsersRepositories") 
    private usersRepositories: IUsersRepositories){}

  public async execute({id, tag_id, user_sender, user_receiver, message} : IRequest): Promise<Compliment>{

    const compliment = await this.complimentsRepositories.findByID(id);

    if(!compliment){
      throw new Error("Compliment does not exists!");
    }

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver!");
    }

    const userReceiverExists = await this.usersRepositories.findByID(user_receiver);

    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!");
    }

    const updatedCompliment = await this.complimentsRepositories.update({id, tag_id, user_sender, user_receiver, message});

    return updatedCompliment;
  }
}

export { UpdateComplimentService };