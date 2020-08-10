import { ApolloError } from 'apollo-server-express';

class ConflictError extends ApolloError {
    public constructor() {
        super('Conflict', 'CONFLICT');
    }
}

export { ConflictError };
