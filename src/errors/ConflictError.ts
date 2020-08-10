import { createError } from 'apollo-errors';

const ConflictError = createError('ConflictError', {
    message: 'Conflict',
});

export { ConflictError };
