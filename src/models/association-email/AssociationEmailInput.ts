import { Field, InputType } from 'type-graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export class AssociationEmailInput {
    @Field()
    @IsEmail()
    public email: string;
}
