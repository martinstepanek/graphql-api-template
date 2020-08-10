import { createError } from 'apollo-errors';

const UnauthorizedError = createError('UnauthorizedError', {
    message: 'Unauthorized',
});

export { UnauthorizedError };
