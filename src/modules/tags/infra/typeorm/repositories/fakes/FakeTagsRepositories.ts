import { EntityRepository, Repository } from 'typeorm'
import { Tag } from '@modules/tags/infra/typeorm/entities/Tag'

@EntityRepository(Tag)
class FakeTagsRepositories extends Repository<Tag>{}

export { FakeTagsRepositories } ;