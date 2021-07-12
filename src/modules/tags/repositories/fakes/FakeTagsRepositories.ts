import { v4 as uuid } from 'uuid'

import { ITagsRepositories } from '@modules/tags/repositories/ITagsRepositories';

import { ICreateTagDTO } from '@modules/tags/dtos/ICreateTagDTO';
import { IUpdateTagDTO } from '@modules/tags/dtos/IUpdateTagDTO';

import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'

class FakeTagsRepositories implements ITagsRepositories{
  private tags: Tag[] = [];


  public async findAll(): Promise<Tag[]> {
    return this.tags;
  }
  
  public async findByID(id: string): Promise<Tag> {
    return this.tags.find(t=> t.id === id);
  }
  
  public async findByName(name: string): Promise<Tag> {
    return this.tags.find(t=> t.name === name);
  }
  
  public async create({name}: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();
    tag.id = uuid();
    tag.name = name;
    this.tags.push(tag);
    return tag;
  }
  
  public async delete(id: string): Promise<string> {
    const tag = this.tags.find(t=> t.id === id);
    const index = this.tags.indexOf(tag);
    this.tags.splice(index);
    return id;
  }
  
  public async update({id, name}: IUpdateTagDTO): Promise<Tag> {
    const tag = this.tags.find(t=> t.id === id);
    tag.name = name;
    return tag;
  }
}

export { FakeTagsRepositories } ;