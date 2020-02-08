import fnva1 from '@sindresorhus/fnv1a';
import { HashState } from '.';

export const hashString = <T>(value: T): HashState<T> =>
  ({
    __hash: fnva1(value as any),
  } as HashState<T>);
