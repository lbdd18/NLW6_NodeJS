import { inject, injectable } from "tsyringe";

import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";
import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";

@injectable()
class ListComplimentsByUserReceiverService {
  constructor(
    @inject("ComplimentsRepositories")
    private complimentsRepositories: IComplimentsRepositories){}

  public async execute(user_receiver: string): Promise<Compliment[]>{
    const compliments = await this.complimentsRepositories.findByUserReceiver(user_receiver);

    return compliments;
  }
}

export { ListComplimentsByUserReceiverService };