import { ClassType, Field, ObjectType } from 'type-graphql';

export default function Edge<TItem>(TItemClass: ClassType<TItem>) {
    @ObjectType({ isAbstract: true })
    abstract class EdgeClass {
        @Field({ description: 'Cursor for pagination (used in after parameter)' })
        public cursor: string;

        @Field(() => TItemClass, { description: 'Paginated item' })
        public node: TItem;
    }
    return EdgeClass;
}
