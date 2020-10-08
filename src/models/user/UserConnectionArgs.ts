import { ArgsType, Field } from 'type-graphql';
import { PaginationInput } from '../common/pagination/PaginationInput';

@ArgsType()
export class UserConnectionArgs {
    @Field(() => PaginationInput, { defaultValue: new PaginationInput() })
    public pagination: PaginationInput;
}
