import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Association } from '../association/Association';
import { Lazy } from '../Lazy';

@Entity()
@ObjectType()
export class AssociationEmail {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    public associationEmailId: number;

    @Column()
    @Field()
    public email: string;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @ManyToOne(() => Association, association => association.adminEmails, {
        lazy: true,
    })
    @Field(() => Association)
    public association: Lazy<Association>;
}
