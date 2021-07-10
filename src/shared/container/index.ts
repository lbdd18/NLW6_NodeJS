import { container } from 'tsyringe'

import { IUsersRepositories } from '@modules/users/repositories/IUsersRepositories'
import { UsersRepositories } from '@modules/users/infra/typeorm/repositories/UsersRepositories'

import { ITagsRepositories } from '@modules/tags/repositories/ITagsRepositories'
import { TagsRepositories } from '@modules/tags/infra/typeorm/repositories/TagsRepositories'

import { IComplimentsRepositories } from '@modules/compliments/repositories/IComplimentsRepositories'
import { ComplimentsRepositories } from '@modules/compliments/infra/typeorm/repositories/ComplimentsRepositories'

container.registerSingleton<IUsersRepositories>('UsersRepositories', UsersRepositories);
container.registerSingleton<ITagsRepositories>('TagsRepositories', TagsRepositories);
container.registerSingleton<IComplimentsRepositories>('ComplimentsRepositories', ComplimentsRepositories);
