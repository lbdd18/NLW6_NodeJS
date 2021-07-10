import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
class ListComplimentByIDService {
  constructor(
    @inject("ComplimentsRepositories")
    private complimentsRepositories: IComplimentsRepositories){}

  async execute(compliment_id: string){
    const compliment = await this.complimentsRepositories.findByID(compliment_id);

    if(!compliment){
      throw new Error("Compliment does not exists!")
    }

    return compliment;
  }
}

export { ListComplimentByIDService };