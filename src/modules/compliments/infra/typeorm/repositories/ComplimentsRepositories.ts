import { getRepository, Repository, EntityRepository } from 'typeorm'

import { IComplimentsRepositories } from '@modules/compliments/repositories/IComplimentsRepositories'

import { Compliment } from '@modules/compliments/infra/typeorm/entities/Compliment'

import { ICreateComplimentDTO } from '@modules/compliments/dtos/ICreateComplimentDTO';
import { IUpdateComplimentDTO } from '@modules/compliments/dtos/IUpdateComplimentDTO';

@EntityRepository(Compliment)
class ComplimentsRepositories implements IComplimentsRepositories{
  private ormRepository: Repository<Compliment>;

  constructor(){
    this.ormRepository = getRepository(Compliment);
  }

  findAll(): Promise<Compliment[]> {
    const compliments = this.ormRepository.find();
    return compliments;
  }

  findByID(id: string): Promise<Compliment> {
    const compliment = this.ormRepository.findOne(id);
    return compliment;
  }

  public async findByUserReceiver(user_receiver: string): Promise<Compliment[]> {
    const compliments = await this.ormRepository.find({user_receiver});
    return compliments;
  }

  public async findByUserSender(user_sender: string): Promise<Compliment[]> {
    const compliments = await this.ormRepository.find({user_sender});
    return compliments;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);
    return id;
  }

  public async update({id, tag_id, user_sender, user_receiver, message}: IUpdateComplimentDTO): Promise<Compliment> {
    const compliment = await this.ormRepository.findOne({id});
    
    compliment.tag_id = tag_id;
    compliment.user_sender = user_sender;
    compliment.user_receiver = user_receiver;
    compliment.message = message;

    await this.ormRepository.save(compliment);
    
    return compliment;
  }

  public async create({tag_id, user_sender, user_receiver, message}: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = this.ormRepository.create({tag_id, user_sender, user_receiver, message});
    
    await this.ormRepository.save(compliment);

    return compliment;
  }
}

export { ComplimentsRepositories } ;