import { PaginationInput } from './PaginationInput';
import { FindConditions, LessThan, MoreThan } from 'typeorm';
import { OrderType } from './OrderType';
import { BaseRepository } from '../database/BaseRepository';

export class ActiveDataProvider<TEntity> {
    constructor(
        private readonly options: {
            repository: BaseRepository<TEntity>;
            pagination: PaginationInput;
            primaryColumn: { [P in keyof TEntity]: TEntity[P] extends string ? P : never }[keyof TEntity];
            dateColumn: keyof TEntity;
            where?: FindConditions<TEntity>;
            order?: {
                [P in keyof TEntity]?: 'ASC' | 'DESC' | 1 | -1;
            };
        }
    ) {}

    public async getIds(): Promise<string[]> {
        let where: FindConditions<TEntity>;
        if (this.options.pagination.after) {
            const afterEntity = await this.options.repository.findOne(this.options.pagination.after);

            if (afterEntity) {
                const afterDate = afterEntity[this.options.dateColumn];

                where = {
                    ...this.options.where,
                    [this.options.dateColumn]:
                        this.options.pagination.order === OrderType.ASC ? MoreThan(afterDate) : LessThan(afterDate),
                };
            } else {
                where = {
                    ...this.options.where,
                };
            }
        } else {
            where = {
                ...this.options.where,
            };
        }

        this.options.order = {
            ...this.options.order,
            [this.options.dateColumn]: this.options.pagination.order,
        };

        const entities = await this.options.repository.find({
            select: [this.options.primaryColumn],
            where,
            take: this.options.pagination.first,
            order: this.options.order,
        });

        return entities.map(entity => entity[this.options.primaryColumn].toString());
    }

    public async geTotalCount(): Promise<number> {
        if (this.options.where) {
            return this.options.repository.count({ where: this.options.where });
        }
        return this.options.repository.count();
    }
}
