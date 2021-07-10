import { inject, injectable } from "tsyringe";

import { IComplimentsRepositories } from "@modules/compliments/repositories/IComplimentsRepositories";

@injectable()
class DeleteComplimentService {
  constructor(
    @inject('ComplimentsRepositories')
    private complimentsRepositories: IComplimentsRepositories){}

  public async execute(id: string): Promise<string>{
    const compliment = await this.complimentsRepositories.findByID(id);

    if(!compliment){
      throw new Error("Compliment does not exists!");
    }

    await this.complimentsRepositories.delete(id);

    return id;
  }
}

export { DeleteComplimentService };