import { v4 as uuid } from "uuid";
import { IComplimentsRepositories } from "../IComplimentsRepositories";

import { ICreateComplimentDTO } from "@modules/compliments/dtos/ICreateComplimentDTO";
import { IUpdateComplimentDTO } from "@modules/compliments/dtos/IUpdateComplimentDTO";

import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";

class FakeComplimentsRepositories implements IComplimentsRepositories{
  private compliments: Compliment[] = [];
  
  public async findAll(): Promise<Compliment[]> {
    return this.compliments;
  }
  
  public async findByID(id: string): Promise<Compliment> {
    return this.compliments.find(c => c.id === id);
  }
  
  public async findByUserReceiver(user_receiver: string): Promise<Compliment[]> {
    return this.compliments.filter(c => c.user_receiver === user_receiver);
  }
  
  public async findByUserSender(user_sender: string): Promise<Compliment[]> {
    return this.compliments.filter(c => c.user_sender === user_sender);
  }
  
  public async create({tag_id, user_sender, user_receiver, message}: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = new Compliment();
    compliment.id = uuid();
    compliment.tag_id = tag_id;
    compliment.user_sender = user_sender;
    compliment.user_receiver = user_receiver;
    compliment.message = message;
    this.compliments.push(compliment);
    return compliment;
  }
  
  public async delete(id: string): Promise<string> {
    const compliment = this.compliments.find(t=> t.id === id);
    const index = this.compliments.indexOf(compliment);
    this.compliments.splice(index);
    return id;
  }
  
  public async update({id, tag_id, user_sender, user_receiver, message}: IUpdateComplimentDTO): Promise<Compliment> {
    const compliment = this.compliments.find(t=> t.id === id);
    compliment.tag_id = tag_id;
    compliment.user_sender = user_sender;
    compliment.user_receiver = user_receiver;
    compliment.message = message;
    return compliment;
  }
}

export { FakeComplimentsRepositories };