import { Service } from 'typedi';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import config from '../../config';
import { AuthenticationError } from 'apollo-server-express';

@Service('AuthService')
export class AuthService {
    private googleAuthClient: OAuth2Client;

    public constructor() {
        this.googleAuthClient = new OAuth2Client(config.google.clientId);
    }

    public async verifyTokenId(tokenId: string): Promise<TokenPayload> {
        try {
            const ticket = await this.googleAuthClient.verifyIdToken({
                idToken: tokenId,
            });
            return ticket.getPayload();
        } catch (e) {
            throw new AuthenticationError('Invalid token');
        }
    }

    public generateAccessToken(): string {
        const generateString = () =>
            Math.random()
                .toString(36)
                .substring(2, 15);
        return generateString() + generateString() + generateString() + generateString();
    }
}
