import { AuthenticationError } from 'apollo-server-express';

export const errorFormatter = error => {
    if (error.originalError.message.startsWith('Access denied')) {
        return new AuthenticationError('User not logged in');
    }
    return error;
};
