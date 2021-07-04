import { getCustomRepository } from "typeorm";

import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

class DeleteComplimentService {
  async execute(id: string){
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);

    const compliment = await complimentsRepository.findOne(id);

    if(!compliment){
      throw new Error("Compliment does not exists!");
    }

    const result = await complimentsRepository.delete({id});

    return result;
  }
}

export { DeleteComplimentService };