import { Field, InputType } from 'type-graphql';
import { Length, MaxLength } from 'class-validator';
import { AssociationEmailInput } from '../association-email/AssociationEmailInput';
import { AssociationBorderInput } from '../association-border/AssociationBorderInput';

@InputType()
export class AssociationInput {
    @Field({ description: 'Association name, needs to be unique' })
    @MaxLength(255)
    public name: string;

    @Field({ description: 'Member code' })
    @Length(4, 4)
    public memberCode: string;

    @Field({ description: 'Guest code, only for guests with limited access' })
    @Length(4, 4)
    public guestCode: string;

    @Field({ description: 'Country 3 letter code where is association located' })
    @Length(3, 3)
    public state: string;

    @Field(() => [AssociationEmailInput], {
        nullable: true,
        description: 'E-mails of admin, that has unlimited access to association',
    })
    public adminEmails: AssociationEmailInput[];

    @Field(() => [AssociationBorderInput], {
        nullable: true,
        description: 'Points on map defining borders of association',
    })
    public huntingGround: AssociationBorderInput[];
}
