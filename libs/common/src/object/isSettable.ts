import {PropertyInfo} from './index';

export function isSettable(p: PropertyInfo) {
  return !!(p.descriptor.set || p.descriptor.writable);
}
