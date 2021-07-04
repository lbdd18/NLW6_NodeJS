import { getCustomRepository } from "typeorm";

import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  id: string;
  name: string;
}

class UpdateTagService {
  async execute({id, name} : ITagRequest){
    const tagsRepository = getCustomRepository(TagsRepositories);

    if(!name){
      throw new Error("Name incorrect!");
    }

    const tag = await tagsRepository.findOne({id});

    if(!tag){
      throw new Error("Tag does not exists!");
    }

    tag.name = name;

    await tagsRepository.save(tag);

    return tag;
  }
}

export { UpdateTagService };