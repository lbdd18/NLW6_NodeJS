import { getCustomRepository } from "typeorm";
import { TagsRespositories } from "../repositories/TagsRepositories";

interface ITagRequest {
  name: string;
}

class CreateTagService {
  async execute({name} : ITagRequest){
    const tagsRepository = getCustomRepository(TagsRespositories);

    if(!name){
      throw new Error("Name incorrect!");
    }

    const tagAlreadyExists = await tagsRepository.findOne({name});

    if(tagAlreadyExists){
      throw new Error("Name already exists!")
    }

    const tag = tagsRepository.create({name});

    await tagsRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };