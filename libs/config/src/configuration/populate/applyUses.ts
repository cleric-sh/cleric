import {Misc} from 'ts-toolbelt';

import {SourcePaths, getSourcePaths} from './getSourcePaths';

export function applyUses(target: Misc.JSON.Object, propertyKey: string, current: SourcePaths) {
  const propertyKeys = getSourcePaths(target, propertyKey);

  const propertyValue = target[propertyKey];

  if (typeof propertyValue === 'object' && propertyValue !== null) {
    const propertyClassKeys = getSourcePaths(propertyValue);
    return {...current, ...propertyClassKeys, ...propertyKeys};
  }

  return {...current, ...propertyKeys};
}
