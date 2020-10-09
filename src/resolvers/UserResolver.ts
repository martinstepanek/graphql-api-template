import { Arg, Args, Authorized, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Inject } from 'typedi';
import { UserRepository } from '../models/user/UserRepository';
import { User } from '../models/user/User';
import { AuthService } from '../models/user/AuthService';
import { UserInput } from '../models/user/UserInput';
import { RequestContainer } from '../decorators/RequestContainer';
import { UserLoader } from '../models/user/UserLoader';
import { UserConnection } from '../models/user/UserConnection';
import { ActiveDataProvider } from '../models/common/pagination/ActiveDataProvider';
import { UserConnectionArgs } from '../models/user/UserConnectionArgs';
import { UserEdge } from '../models/user/UserEdge';

@Resolver(User)
export class UserResolver {
    public constructor(
        @InjectRepository() private readonly userRepository: UserRepository,
        @Inject('AuthService') private readonly authService: AuthService
    ) {}

    @Mutation(() => User, { description: 'Login/Register new user' })
    public async login(@Arg('user') userInput: UserInput): Promise<User> {
        const token = await this.authService.verifyTokenId(userInput.tokenId);

        const user = await this.userRepository.findOne({
            where: {
                email: token.email,
            },
        });

        if (user) {
            return user;
        }

        const newUser = this.userRepository.create();
        newUser.name = token.name;
        newUser.email = token.email;
        newUser.picture = token.picture;
        newUser.accessToken = this.authService.generateAccessToken();
        return await this.userRepository.save(newUser);
    }

    @Authorized()
    @Query(() => User, { description: 'Get user by id', nullable: true })
    public async user(@Arg('userId') userId: string, @RequestContainer() userLoader: UserLoader): Promise<User> {
        const model = await userLoader.load(userId);
        if (model === undefined) {
            return null;
        }
        return model;
    }

    @Authorized()
    @Query(() => UserConnection, { description: 'Get paginated users' })
    public async users(@Args() { pagination }: UserConnectionArgs): Promise<UserConnection> {
        const activeDataProvider = new ActiveDataProvider({
            repository: this.userRepository,
            pagination,
            dateColumn: 'createdAt',
            primaryColumn: 'userId',
        });

        const edges = (await activeDataProvider.getIds()).map(
            (id: string): UserEdge => {
                const node = new User();
                node.userId = id;
                return {
                    cursor: id,
                    node,
                };
            }
        );

        return {
            totalCount: await activeDataProvider.getTotalCount(),
            edges: edges,
        };
    }

    @FieldResolver(() => String)
    public async name(@Root() user: User, @RequestContainer() userLoader: UserLoader): Promise<string> {
        const userEntity = await userLoader.load(user.userId);
        return userEntity.name;
    }

    @FieldResolver(() => String)
    public async email(@Root() user: User, @RequestContainer() userLoader: UserLoader): Promise<string> {
        const userEntity = await userLoader.load(user.userId);
        return userEntity.email;
    }

    @FieldResolver(() => String)
    public async picture(@Root() user: User, @RequestContainer() userLoader: UserLoader): Promise<string> {
        const userEntity = await userLoader.load(user.userId);
        return userEntity.picture;
    }
}
