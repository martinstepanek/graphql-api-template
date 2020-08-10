import { ApolloError } from 'apollo-server';

class ConflictError extends ApolloError {
    public constructor() {
        super('Conflict', 'CONFLICT');
    }
}

export { ConflictError };
