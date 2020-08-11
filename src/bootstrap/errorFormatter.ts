import { AuthenticationError } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

export const errorFormatter = (error: GraphQLError): GraphQLError => {
    if (error.originalError.message.startsWith('Access denied')) {
        return new AuthenticationError('User not logged in');
    }
    return error;
};
