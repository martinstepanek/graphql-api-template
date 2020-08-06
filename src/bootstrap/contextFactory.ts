import { Context } from '../models/Context';
import * as TypeORM from 'typeorm';
import { UserRepository } from '../models/user/UserRepository';
import { UnauthorizedError } from 'type-graphql';

export const contextFactory = async ({ request }): Promise<Context> => {
    const accessToken = request.header('Access-Token');
    if (!accessToken) {
        return { user: null };
    }

    const userRepository = TypeORM.getCustomRepository(UserRepository);
    const user = await userRepository.findOne({
        where: {
            accessToken,
        },
    });

    if (accessToken && !user) {
        throw new UnauthorizedError();
    }

    return { user };
};
