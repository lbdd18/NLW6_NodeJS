import { EntityRepository, Repository } from 'typeorm'
import { Tag } from '../entities/Tag'

@EntityRepository(Tag)
class TagsRespositories extends Repository<Tag>{}

export { TagsRespositories } ;