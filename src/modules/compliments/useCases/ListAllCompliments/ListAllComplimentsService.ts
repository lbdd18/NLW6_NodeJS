import { inject, injectable } from 'tsyringe'

import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";
import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";

@injectable()
class ListAllComplimentsService {
  constructor(
    @inject("ComplimentsRepositories")
    private complimentsRespositories: IComplimentsRepositories){}

  public async execute(): Promise<Compliment[]>{
    const compliments = await this.complimentsRespositories.findAll();
    return compliments;
  }
}

export { ListAllComplimentsService };