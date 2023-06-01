import {Class} from 'Class/Class';
import 'reflect-metadata';
import {isConstructor} from '../guards/isConstructor';

export const getMetadata = (
  metadataKey: string,
  target: Class | Object,
  propertyKey?: string | symbol
) => {
  if (isConstructor(target)) return Reflect.getMetadata(metadataKey, target);

  if (propertyKey) {
    return Reflect.getMetadata(metadataKey, target, propertyKey);
  }

  return Reflect.getMetadata(metadataKey, (target as any).constructor);
};
