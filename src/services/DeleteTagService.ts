import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


class DeleteTagService {
  async execute(id: string){
    const tagsRepository = getCustomRepository(TagsRepositories);

    const tag = await tagsRepository.findOne(id);

    if(!tag){
      throw new Error("Tag does not exists!");
    }

    const result = await tagsRepository.delete({id});

    return result;
  }
}

export { DeleteTagService };