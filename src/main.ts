import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { UserResolver } from './models/user/UserResolver';
import { contextFactory } from './bootstrap/contextFactory';
import { authChecker } from './bootstrap/authChecker';
import { errorFormatter } from './bootstrap/errorFormatter';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { register as registerPrometheusClient } from 'prom-client';
import createMetricsPlugin from 'apollo-metrics';

/**
 * Bootstrapping function
 */
async function bootstrap(): Promise<void> {
    // Type di with type ORM
    TypeORM.useContainer(Container);

    // Database connection
    await TypeORM.createConnection();

    // Building scheme with type-graphql
    const schema = await buildSchema({
        resolvers: [UserResolver],
        container: Container,
        authChecker,
    });

    // Express app
    const app = express();

    // Setup /metrics endpoint for prometheus
    app.get('/metrics', (_, res) => res.send(registerPrometheusClient.metrics()));
    const apolloMetricsPlugin = createMetricsPlugin(registerPrometheusClient);

    // Apollo server
    const server = new ApolloServer({
        schema,
        context: contextFactory,
        formatError: errorFormatter,
        // @ts-ignore
        plugins: [apolloMetricsPlugin],
        tracing: true,
    });

    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
}

bootstrap();
