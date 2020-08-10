import { ApolloError } from 'apollo-server-express';

class NotFoundError extends ApolloError {
    public constructor() {
        super('Entity not found', 'NOT_FOUND');
    }
}

export { NotFoundError };
