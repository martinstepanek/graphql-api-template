import { Service } from 'typedi';
import { UserRepository } from './UserRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import DataLoader = require('dataloader');
import { User } from './User';

@Service()
export class UserLoader extends DataLoader<string, User | undefined> {
    constructor(@InjectRepository() userRepository: UserRepository) {
        super(async (keys: string[]) => {
            const results = await userRepository.findByIds(keys);
            return keys.map(key => results.find(result => result.userId === key));
        });
    }
}
