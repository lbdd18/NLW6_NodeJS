import { injectable, inject } from 'tsyringe'

import { IUsersRepositories } from "@modules/users/repositories/IUsersRepositories";
import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";

import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";

interface IRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

@injectable()
class CreateComplimentService {
  constructor(
    @inject('ComplimentsRepositories')
    private complimentsRepositories: IComplimentsRepositories, 
    @inject('UsersRepositories')
    private usersRepositories: IUsersRepositories){}

  public async execute({tag_id, user_sender, user_receiver, message} : IRequest): Promise<Compliment>{

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver!");
    }

    const userReceiverExists = await this.usersRepositories.findByID(user_receiver);

    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!");
    }

    const compliment = await this.complimentsRepositories.create({tag_id, user_sender, user_receiver, message});

    return compliment;
  }
}

export { CreateComplimentService };