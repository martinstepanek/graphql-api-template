import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssociationEmail } from '../association-email/AssociationEmail';
import { Lazy } from '../Lazy';
import { AssociationBorder } from '../association-border/AssociationBorder';

@Entity()
@ObjectType()
export class Association {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    public associationId: number;

    @Column({ unique: true })
    @Field()
    public name: string;

    @Column({
        length: 4,
    })
    @Field()
    public memberCode: string;

    @Column({
        length: 4,
    })
    @Field()
    public guestCode: string;

    @Column({
        length: 3,
    })
    @Field()
    public state: string;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @OneToMany(() => AssociationEmail, email => email.association, {
        lazy: true,
        cascade: ['insert'],
    })
    @Field(() => [AssociationEmail])
    public adminEmails: Lazy<AssociationEmail[]>;

    @OneToMany(() => AssociationBorder, border => border.association, {
        lazy: true,
        cascade: ['insert'],
    })
    @Field(() => [AssociationBorder])
    public huntingGround: Lazy<AssociationBorder[]>;
}
