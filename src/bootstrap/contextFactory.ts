import { Context } from '../models/Context';
import * as TypeORM from 'typeorm';
import { UserRepository } from '../models/user/UserRepository';
import { ExpressContext } from 'apollo-server-express/src/ApolloServer';

export const contextFactory = async ({ req }: ExpressContext): Promise<Context> => {
    
    const accessToken = req.header('Access-Token');
    if (!accessToken) {
        return { user: null, req };
    }

    const userRepository = TypeORM.getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            accessToken,
        },
    });

    return { user, req };
};
