import { EntityRepository, Repository, getRepository } from 'typeorm'

import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'

import { ITagsRepositories } from '@modules/tags/repositories/ITagsRepositories';

import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';
import { IUpdateTagDTO } from '@modules/tags/dtos/IUpdateTagDTO';

@EntityRepository(Tag)
class TagsRepositories implements ITagsRepositories{
  private ormRepository: Repository<Tag>;

  constructor(){
    this.ormRepository = getRepository(Tag);
  }

  public async findAll(): Promise<Tag[]> {
    const tags = await this.ormRepository.find();
    return tags;
  }

  public async findByID(id: string): Promise<Tag> {
    const tag = await this.ormRepository.findOne(id);
    return tag;
  }

  public async findByName(name: string): Promise<Tag> {
    const tag = await this.ormRepository.findOne({name});
    return tag;
  }

  public async create({name}: ICreateTagDTO): Promise<Tag> {
    const tag = this.ormRepository.create({name});
    await this.ormRepository.save(tag);
    return tag;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);
    return id;
  }

  public async update({id, name}: IUpdateTagDTO): Promise<Tag> {
    const tag = await this.ormRepository.findOne(id);
    
    tag.name = name;

    await this.ormRepository.save(tag);

    return tag;
  }
}

export { TagsRepositories } ;