import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserState } from './UserState';

@Entity()
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    public userId: string;

    @Column()
    @Field()
    public name: string;

    @Column({ unique: true })
    @Field()
    public email: string;

    @Column()
    @Field()
    public picture: string;

    @Column()
    @Field()
    public accessToken: string;

    @Column({ type: 'enum', enum: UserState, default: UserState.Created })
    public state: UserState;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;
}
