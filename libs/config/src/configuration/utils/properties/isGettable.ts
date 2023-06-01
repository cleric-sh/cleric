import {PropertyInfo} from './index';
import {isDeclared} from './isDeclared';

export function isGettable(p: PropertyInfo) {
  return !!(p.descriptor.get || isDeclared(p.descriptor, 'value'));
}
