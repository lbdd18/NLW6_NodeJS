import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListComplimentsByUserSenderService {
  async execute(user_sender: string){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find({user_sender});

    return compliments;
  }
}

export { ListComplimentsByUserSenderService };