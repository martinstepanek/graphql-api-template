import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from 'type-graphql';
import { Association } from '../association/Association';
import { Lazy } from '../Lazy';

@Entity()
@ObjectType()
export class AssociationBorder {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    public associationBorderId: number;

    @Column('double')
    @Field()
    public lat: number;

    @Column('double')
    @Field()
    public lng: number;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @ManyToOne(() => Association, association => association.huntingGround, {
        lazy: true,
    })
    @Field(() => Association)
    public association: Lazy<Association>;
}
