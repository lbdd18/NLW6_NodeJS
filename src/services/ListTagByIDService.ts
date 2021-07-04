import { getCustomRepository } from "typeorm";

import { TagsRepositories } from "../repositories/TagsRepositories";

class ListTagByIDService {
  async execute(tag_id: string){
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tag = await tagsRepository.findOne({id:tag_id});

    if(!tag){
      throw new Error("Tag does not exists!")
    }

    return tag;
  }
}

export { ListTagByIDService };