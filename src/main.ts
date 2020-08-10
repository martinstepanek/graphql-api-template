import { GraphQLServer, Options } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { UserResolver } from './models/user/UserResolver';
import { contextFactory } from './bootstrap/contextFactory';
import { authChecker } from './bootstrap/authChecker';
import { Server as HttpServer } from 'http';
import { errorFormatter } from './bootstrap/errorFormatter';

/**
 * Bootstrapping function
 */
async function bootstrap(): Promise<HttpServer> {
    TypeORM.useContainer(Container);

    await TypeORM.createConnection();

    const schema = await buildSchema({
        resolvers: [UserResolver],
        container: Container,
        authChecker,
    });

    const server = new GraphQLServer({
        schema,
        context: contextFactory,
    });

    const options: Options = {
        formatError: errorFormatter,
        tracing: { mode: 'enabled' },
    };

    return server.start(options, ({ endpoint, port }): void => console.log(`Server is running on ${endpoint}:${port}`));
}

bootstrap();
