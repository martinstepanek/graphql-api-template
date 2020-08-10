import { User } from './user/User';
import { Request } from 'express';

export class Context {
    public user: User;
    public req: Request;
}
