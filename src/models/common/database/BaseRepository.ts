import { Repository } from 'typeorm';

export class BaseRepository<Entity> extends Repository<Entity> {}
