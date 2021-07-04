import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  id: string;
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class UpdateComplimentService {
  async execute({id, tag_id, user_sender, user_receiver, message} : IComplimentRequest){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository = getCustomRepository(UsersRepositories);

    const compliment = await complimentsRepository.findOne({id});

    if(!compliment){
      throw new Error("Compliment does not exists!");
    }

    if(user_sender === user_receiver){
      throw new Error("Incorrect User Receiver!");
    }

    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if(!userReceiverExists){
      throw new Error("User Receiver does not exists!");
    }

    compliment.tag_id = tag_id;
    compliment.user_sender = user_sender;
    compliment.user_receiver = user_receiver;
    compliment.message = message;

    await complimentsRepository.save(compliment);

    return compliment;
  }
}

export { UpdateComplimentService };