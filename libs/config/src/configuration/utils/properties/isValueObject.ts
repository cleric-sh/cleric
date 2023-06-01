import {PropertyInfo} from './index';

export function isValueObject(p: PropertyInfo) {
  return typeof p.descriptor.value === 'object' && p.descriptor.value !== null;
}
