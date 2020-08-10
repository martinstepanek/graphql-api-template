import { Context } from '../models/Context';
import * as TypeORM from 'typeorm';
import { UserRepository } from '../models/user/UserRepository';

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

    return { user };
};
