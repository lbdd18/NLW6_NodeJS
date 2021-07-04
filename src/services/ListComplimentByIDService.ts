import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class ListComplimentByIDService {
  async execute(compliment_id: string){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliment = await complimentsRepository.findOne({id:compliment_id});

    if(!compliment){
      throw new Error("Compliment does not exists!")
    }

    return compliment;
  }
}

export { ListComplimentByIDService };