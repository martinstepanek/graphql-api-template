import { Field, InputType, Int } from 'type-graphql';
import { Max, Min } from 'class-validator';
import { OrderType } from './OrderType';

@InputType()
export class PaginationInput {
    @Field(() => Int, { defaultValue: 10, description: 'Number of items to return, maximum is 50' })
    @Min(0)
    @Max(50)
    public first: number = 10;

    @Field({ nullable: true, description: 'Show items after cursor'})
    public after: string;

    @Field(() => OrderType, { defaultValue: OrderType.ASC })
    public order: OrderType = OrderType.ASC;
}
