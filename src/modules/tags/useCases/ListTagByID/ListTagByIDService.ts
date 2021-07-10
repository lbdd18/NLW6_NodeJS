import { inject, injectable } from "tsyringe";

import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";
import { ITagsRepositories } from "@modules/tags/repositories/ITagsRepositories";

@injectable()
class ListTagByIDService {
  constructor(
    @inject("TagsRepositories")
    private tagsRepositories: ITagsRepositories){}

  public async execute(id: string): Promise<Tag>{
    
    const tag = await this.tagsRepositories.findByID(id);

    if(!tag){
      throw new Error("Tag does not exists!")
    }

    return tag;
  }
}

export { ListTagByIDService };