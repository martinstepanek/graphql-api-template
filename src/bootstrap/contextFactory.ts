import { Context } from '../models/Context';
import * as TypeORM from 'typeorm';
import { UserRepository } from '../models/user/UserRepository';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';
import { UserIdentity } from '../models/user/UserIdentity';
import { Container } from 'typedi';

export const contextFactory = async ({ req, connection }: ExpressContext): Promise<Context> => {
    const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const accessToken = (connection ? connection.context['Access-Token'] : req.header('Access-Token'))?.replace(
        'Bearer ',
        ''
    );

    const userIdentity = new UserIdentity();
    const context: Context = {
        userIdentity,
        req,
        requestId,
    };

    if (accessToken) {
        const userRepository = TypeORM.getCustomRepository(UserRepository);
        context.userIdentity.user = await userRepository.findOne({
            where: {
                accessToken,
            },
        });
    }
    Container.of(requestId).set('Context', context);

    return context;
};
