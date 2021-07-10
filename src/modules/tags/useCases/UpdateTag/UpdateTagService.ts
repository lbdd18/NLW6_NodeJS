import { inject, injectable } from "tsyringe";

import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";
import { ITagsRepositories } from "@modules/tags/repositories/ITagsRepositories";

interface ITagRequest {
  id: string;
  name: string;
}

@injectable()
class UpdateTagService {
  constructor(
    @inject("TagsRepositories")
    private tagsRepositories: ITagsRepositories){}

  public async execute({id, name} : ITagRequest): Promise<Tag>{

    if(!name){
      throw new Error("Name incorrect!");
    }

    const tag = await this.tagsRepositories.findByID(id);

    if(!tag){
      throw new Error("Tag does not exists!");
    }

    const updatedTag = await this.tagsRepositories.update({id, name});

    return updatedTag;
  }
}

export { UpdateTagService };