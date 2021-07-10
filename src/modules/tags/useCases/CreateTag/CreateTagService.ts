import { inject, injectable } from "tsyringe";

import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";
import { ITagsRepositories } from "@modules/tags/repositories/ITagsRepositories";

interface IRequest {
  name: string;
}

@injectable()
class CreateTagService {
  constructor(
    @inject("TagsRepositories")
    private tagsRepositories: ITagsRepositories){}

  public async execute({name} : IRequest): Promise<Tag>{

    if(!name){
      throw new Error("Name incorrect!");
    }

    const tagAlreadyExists = await this.tagsRepositories.findByName(name);

    if(tagAlreadyExists){
      throw new Error("Name already exists!")
    }

    const tag = await this.tagsRepositories.create({name});

    return tag;
  }
}

export { CreateTagService };