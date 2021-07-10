import { inject, injectable } from "tsyringe";

import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";
import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";

@injectable()
class ListComplimentsByUserSenderService {
  constructor(
    @inject("ComplimentsRepositories")
    private complimentsRepositories : IComplimentsRepositories){}

  public async execute(user_sender: string): Promise<Compliment[]>{
    const compliments = await this.complimentsRepositories.findByUserSender(user_sender);

    return compliments;
  }
}

export { ListComplimentsByUserSenderService };