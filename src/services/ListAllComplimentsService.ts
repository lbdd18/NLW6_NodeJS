import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListAllComplimentsService {
  async execute(){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepository.find();

    return compliments;
  }
}

export { ListAllComplimentsService };