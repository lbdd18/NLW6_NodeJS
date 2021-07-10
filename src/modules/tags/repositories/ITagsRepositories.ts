import { ICreateTagDTO } from "../dtos/ICreateTagDTO";
import { IUpdateTagDTO } from "../dtos/IUpdateTagDTO";

import { Tag } from "../infra/typeorm/entities/Tag";

interface ITagsRepositories{
  findAll(): Promise<Tag[]>;
  findByID(id: string): Promise<Tag>;
  findByName(name: string): Promise<Tag>;
  create(data: ICreateTagDTO): Promise<Tag>;
  delete(id: string): Promise<string>;
  update(data: IUpdateTagDTO): Promise<Tag>;
}

export { ITagsRepositories }