import fnva1 from '@sindresorhus/fnv1a';
import {HashState} from '.';
import {createHash} from './createHash';

export const hashObject = <T>(value: T): HashState<T> => {
  // Iterates each property and build hash object.
  if (value === null) {
    return {__hash : 0} as HashState<T>;
  }

  return Object.getOwnPropertyNames(value).reduce(
             (node, propName) => {
               // Add property hash under property name
               node[propName] = createHash(value[propName]);

               // Accumulate node's hash
               node.__hash ^= fnva1(propName + node[propName].__hash);

               // Return object hash node so far
               return node;
             },
             {__hash : 0},
             ) as HashState<T>;
};
