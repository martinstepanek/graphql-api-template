import { GraphQLServer } from 'graphql-yoga';
import { buildSchema } from 'type-graphql';
import { AssociationResolver } from './resolvers/AssociationResolver';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

/**
 * Bootstrapping function
 */
async function bootstrap(): Promise<void> {
    TypeORM.useContainer(Container);

    await TypeORM.createConnection();

    const schema = await buildSchema({
        resolvers: [AssociationResolver],

        container: Container,
    });

    const server = new GraphQLServer({
        schema,
    });
    server.start(() => console.log(`Server is running on http://localhost:4000`));
}

bootstrap();
