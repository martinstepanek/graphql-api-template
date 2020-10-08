import { createParamDecorator } from 'type-graphql';
import { Context } from '../models/Context';
import { Container } from 'typedi';

// @see https://github.com/MichalLytek/type-graphql/issues/51#issuecomment-626719854
export function RequestContainer(): ParameterDecorator {
    return function(target: Record<string, any>, propertyName: string | symbol, index: number) {
        return createParamDecorator<Context>(({ context }) => {
            const paramtypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
            const requestContainer = Container.of(context.requestId);
            return requestContainer.get(paramtypes[index]);
        })(target, propertyName, index);
    };
}
