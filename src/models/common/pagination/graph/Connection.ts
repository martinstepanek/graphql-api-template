import { ClassType, Field, Int, ObjectType } from 'type-graphql';

export default function Connection<TEdge>(TEdgeClass: ClassType<TEdge>) {
    @ObjectType({ isAbstract: true })
    abstract class ConnectionClass {
        @Field(() => Int, { description: 'Total number of items' })
        public totalCount: number;

        @Field(() => [TEdgeClass])
        public edges: TEdge[];
    }
    return ConnectionClass;
}
