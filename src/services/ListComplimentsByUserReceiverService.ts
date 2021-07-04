import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListComplimentsByUserReceiverService {
  async execute(user_receiver: string){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find({user_receiver});

    return compliments;
  }
}

export { ListComplimentsByUserReceiverService };