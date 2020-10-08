import { OrderType } from '../models/common/pagination/OrderType';
import { registerEnumType } from 'type-graphql';

export const registerEnumsToSchema = () => {
    registerEnumType(OrderType, {
        name: 'OrderType',
    });
};
