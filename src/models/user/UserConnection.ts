import { ObjectType } from 'type-graphql';
import { UserEdge } from './UserEdge';
import Connection from '../common/pagination/graph/Connection';

@ObjectType()
export class UserConnection extends Connection<UserEdge>(UserEdge) {}
