import { inject, injectable } from "tsyringe";

import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";
import { ITagsRepositories } from "@modules/tags/repositories/ITagsRepositories";

@injectable()
class ListAllTagsService {
  constructor(
    @inject("TagsRepositories")
    private tagsRepositories: ITagsRepositories){}

  public async execute(): Promise<Tag[]>{

    const tags = await this.tagsRepositories.findAll();

    return tags;
  }
}

export { ListAllTagsService };