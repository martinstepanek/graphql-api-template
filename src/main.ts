import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';
import { UserResolver } from './models/user/UserResolver';
import { contextFactory } from './bootstrap/contextFactory';
import { authChecker } from './bootstrap/authChecker';
import { ApolloServer } from 'apollo-server';
import { errorFormatter } from './bootstrap/errorFormatter';

/**
 * Bootstrapping function
 */
async function bootstrap(): Promise<void> {
    TypeORM.useContainer(Container);

    await TypeORM.createConnection();

    const schema = await buildSchema({
        resolvers: [UserResolver],
        container: Container,
        authChecker,
    });

    const server = new ApolloServer({
        schema,
        context: contextFactory,
        formatError: errorFormatter,
    });

    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
}

bootstrap();
