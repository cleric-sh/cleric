import {Class} from 'Class/Class';

import {SourceKey} from '../sources';
import {getUseSourceKeys} from './getUseSourceKeys';

export type SourcePaths = {
  [name in SourceKey]?: string[];
};

export function getSourcePaths(target: Class | Object, propertyKey?: string) {
  return getUseSourceKeys(target, propertyKey).reduce((acc: SourcePaths, key: SourceKey) => {
    acc[key] = [];
    return acc;
  }, {});
}
