import { Service } from 'typedi';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import config from '../../config';

@Service('AuthService')
export class AuthService {
    private googleAuthClient: OAuth2Client;

    public constructor() {
        this.googleAuthClient = new OAuth2Client(config.googleClientId);
    }

    public async verifyTokenId(tokenId: string): Promise<TokenPayload> {
        const ticket = await this.googleAuthClient.verifyIdToken({
            idToken: tokenId,
        });
        return ticket.getPayload();
    }

    public generateAccessToken(): string {
        const generateString = () =>
            Math.random()
                .toString(36)
                .substring(2, 15);
        return generateString() + generateString() + generateString() + generateString();
    }
}
