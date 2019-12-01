import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class AssociationArgs {
    @Field({ nullable: true, description: 'Association name that would be searched' })
    public name?: string;
}
