import { createError } from 'apollo-errors';

const ForbiddenError = createError('ForbiddenError', {
    message: 'Forbidden',
});

export { ForbiddenError };
