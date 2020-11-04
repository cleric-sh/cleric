import {HashState} from '.';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hashUndefined = <T>(value: T): HashState<T> =>
  ({
    __hash: 0,
  } as HashState<T>);
