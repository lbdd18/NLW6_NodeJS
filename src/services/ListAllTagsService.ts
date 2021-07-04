import { getCustomRepository } from "typeorm";

import { TagsRepositories } from "../repositories/TagsRepositories";

class ListAllTagsService {
  async execute(){
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tags = await tagsRepository.find();

    return tags;
  }
}

export { ListAllTagsService };