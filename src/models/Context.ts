import { Request } from 'express';
import { UserIdentity } from './user/UserIdentity';

export class Context {
    public userIdentity: UserIdentity;
    public req: Request;
    public requestId: number;
}
