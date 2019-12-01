import { Association } from '../models/association/Association';
import { EntityRepository, Repository } from 'typeorm';
import { Service } from 'typedi';

@Service()
@EntityRepository(Association)
export class AssociationRepository extends Repository<Association> {}
