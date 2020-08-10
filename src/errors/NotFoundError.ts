import { createError } from 'apollo-errors';

const NotFoundError = createError('NotFoundError', {
    message: 'Entity not found',
});

export { NotFoundError };
