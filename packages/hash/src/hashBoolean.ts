import { HashState } from '.';

export const hashBoolean = <T>(value: T): HashState<T> =>
  ({
    __hash: ((value ? 23 : 0) as any) as number,
  } as HashState<T>);
