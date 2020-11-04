import {FilterExclude} from '@cleric/common/src/types';

export type HashState<T> = {
  [P in keyof FilterExclude<T, Function>]: HashState<
    FilterExclude<T, Function>[P]
  >;
} & {
  __hash: number;
};

export {createHash} from './createHash';
export {updateHash} from './updateHash';
