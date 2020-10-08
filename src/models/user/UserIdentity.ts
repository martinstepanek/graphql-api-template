import { User } from './User';

export class UserIdentity {
    public user: User;

    public get isLoggedIn(): boolean {
        return Boolean(this.user);
    }

    public isItMe(userOrUserId: User | string): boolean {
        if (userOrUserId instanceof User) {
            return this.isLoggedIn && userOrUserId && this.user.userId === userOrUserId.userId;
        }
        return this.isLoggedIn && userOrUserId && this.user.userId === userOrUserId;
    }
}
