import { Compliment } from '../infra/typeorm/entities/Compliment'

import { ICreateComplimentDTO } from '../dtos/ICreateComplimentDTO'
import { IUpdateComplimentDTO } from '../dtos/IUpdateComplimentDTO'

interface IComplimentsRepositories{
  findAll(): Promise<Compliment[]>;
  findByID(id: string): Promise<Compliment>;
  findByUserReceiver(user_receiver: string): Promise<Compliment[]>;
  findByUserSender(user_sender: string): Promise<Compliment[]>;
  create(data: ICreateComplimentDTO): Promise<Compliment>;
  delete(id: string): Promise<string>;
  update(data: IUpdateComplimentDTO): Promise<Compliment>; 
}

export { IComplimentsRepositories }