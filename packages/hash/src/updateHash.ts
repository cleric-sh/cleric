import fnva1 from '@sindresorhus/fnv1a';

import {HashState} from '.';
import {createHash} from './createHash';

export const updateHash = (
  hashState: HashState<any>,
  path: string[],
  value: any,
  depth = 0
) => {
  if (depth < path.length) {
    const targetName = path[depth];
    const targetNode = hashState[targetName];

    hashState[targetName] = updateHash(targetNode, path, value, depth + 1);

    hashState.__hash = Object.getOwnPropertyNames(hashState).reduce(
      (acc, propName) => {
        if (propName.startsWith('__')) {
          return acc;
        } else {
          return acc ^ fnva1(propName + hashState[propName].__hash);
        }
      },
      0
    );

    return hashState;
  } else {
    return createHash(value);
  }
};
