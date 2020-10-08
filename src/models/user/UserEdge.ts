import { ObjectType } from 'type-graphql';
import { User } from './User';
import Edge from '../common/pagination/graph/Edge';

@ObjectType()
export class UserEdge extends Edge<User>(User) {}
