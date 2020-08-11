import * as Sentry from '@sentry/node';
import { Context } from '../models/Context';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

// @see https://gist.github.com/nodkz/d14b236d67251d2df5674cb446843732
export const apolloServerSentryPlugin: ApolloServerPlugin = {
    // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
    requestDidStart() {
        return {
            didEncounterErrors(rc) {
                Sentry.withScope(scope => {
                    const context = rc.context as Context;

                    scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, context.req));

                    if (Boolean(context.user)) {
                        scope.setUser({
                            //id: context.user.id,
                            ip_address: context.req?.ip,
                            user: context.user.getSentryInformation(),
                        });
                    }

                    scope.setTags({
                        graphql: rc.operation?.operation || 'parse_err',
                        graphqlName: rc.operationName || rc.request.operationName,
                    });

                    rc.errors.forEach(error => {
                        if (error.path || error.name !== 'GraphQLError') {
                            scope.setExtras({
                                path: error.path,
                            });
                            Sentry.captureException(error);
                        } else {
                            // We dont want to report wrong graphql queries
                            // scope.setExtras({});
                            // Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
                        }
                    });
                });
            },
        };
    },
};
