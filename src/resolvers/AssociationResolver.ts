import { Arg, Args, Mutation, Query, Resolver } from 'type-graphql';
import { Association } from '../models/association/Association';
import { AssociationInput } from '../models/association/AssociationInput';
import { AssociationEmailInput } from '../models/association-email/AssociationEmailInput';
import { AssociationBorderInput } from '../models/association-border/AssociationBorderInput';
import { AssociationArgs } from '../models/association/AssociationArgs';
import { AssociationRepository } from '../repositories/AssociationRepository';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Like } from 'typeorm';

@Resolver(Association)
export class AssociationResolver {
    public constructor(@InjectRepository() private readonly associationRepository: AssociationRepository) {}

    @Query(() => Association, { description: 'Get one association only by id' })
    public async association(@Arg('associationId') id: number): Promise<Association> {
        const model = await this.associationRepository.findOne(id);
        if (model === undefined) {
            // throw not found error
        }
        return model;
    }

    @Query(() => [Association], {
        description: 'Searches all associations, without specified name returns all of them',
    })
    public async associations(@Args() { name }: AssociationArgs): Promise<Association[]> {
        if (!name) {
            return this.associationRepository.find();
        }

        return this.associationRepository.find({
            where: {
                name: Like('%' + name + '%'),
            },
        });
    }

    @Mutation(() => Association, { description: 'Creates new association' })
    public async createAssociation(
        @Arg('association') associationInput: AssociationInput,
        @Arg('adminEmails', () => [AssociationEmailInput]) adminEmailsInput: AssociationEmailInput[],
        @Arg('huntingGround', () => [AssociationBorderInput]) huntingGroundInput: AssociationBorderInput[]
    ): Promise<Association> {
        associationInput.adminEmails = adminEmailsInput;
        associationInput.huntingGround = huntingGroundInput;

        const association = this.associationRepository.create(associationInput);
        await this.associationRepository.save(association);
        return this.associationRepository.findOne(association.associationId);
    }
}
