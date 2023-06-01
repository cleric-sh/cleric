import 'reflect-metadata';
import {getMetadata} from './getMetadata';

export const pushMetadata: typeof Reflect.metadata = (metadataKey, metadataValue) => {
  return (target: Function | Object, propertyKey?: string | symbol) => {
    const values = getMetadata(metadataKey, target, propertyKey) || [];
    const decorator = Reflect.metadata(metadataKey, [metadataValue, ...values]);
    return propertyKey ? decorator(target, propertyKey) : decorator(target as Function);
  };
};
