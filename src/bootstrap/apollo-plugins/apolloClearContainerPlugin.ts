import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import { Container } from 'typedi';

export const apolloClearContainerPlugin: ApolloServerPlugin = {
    requestDidStart: () => ({
        willSendResponse(requestContext) {
            // remember to dispose the scoped container to prevent memory leaks
            Container.reset(requestContext.context.requestId);
        },
    }),
};
