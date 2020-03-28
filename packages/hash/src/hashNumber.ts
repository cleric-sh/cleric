import {HashState} from '.';

export const hashNumber = <T>(value: T): HashState<T> => ({
  __hash : (value as any) as number,
} as HashState<T>);
