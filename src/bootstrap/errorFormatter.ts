import { formatError } from 'apollo-errors';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export const errorFormatter = (error, ...rest) => {
    if (error.originalError.message.startsWith('Access denied')) {
        return formatError({ ...error, originalError: new UnauthorizedError() }, ...rest);
    }
    return formatError(error, ...rest);
};
