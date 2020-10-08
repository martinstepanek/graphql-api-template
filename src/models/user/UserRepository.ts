import { EntityRepository } from 'typeorm';
import { Service } from 'typedi';
import { User } from './User';
import { BaseRepository } from '../common/database/BaseRepository';

@Service()
@EntityRepository(User)
export class UserRepository extends BaseRepository<User> {}
