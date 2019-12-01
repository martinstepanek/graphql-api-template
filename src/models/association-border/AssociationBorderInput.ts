import { Field, InputType } from 'type-graphql';

@InputType()
export class AssociationBorderInput {
    @Field()
    public lat: number;

    @Field()
    public lng: number;
}
