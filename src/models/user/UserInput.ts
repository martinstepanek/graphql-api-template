import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
    @Field({ description: 'Google token id' })
    public tokenId: string;
}
