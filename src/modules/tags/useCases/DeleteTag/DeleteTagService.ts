import { ITagsRepositories } from "@modules/tags/repositories/ITagsRepositories";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteTagService {
  constructor(
    @inject("TagsRepositories")
    private tagsRepositories: ITagsRepositories){}

  public async execute(id: string): Promise<string>{

    const tag = await this.tagsRepositories.findByID(id);

    if(!tag){
      throw new Error("Tag does not exists!");
    }

    await this.tagsRepositories.delete(id);

    return id;
  }
}

export { DeleteTagService };