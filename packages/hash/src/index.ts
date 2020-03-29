import {Types} from '@cleric/common';

export type HashState<T> = {
  [P in keyof Types.FilterExclude<T, Function>]: HashState<
    Types.FilterExclude<T, Function>[P]
  >;
} & {
  __hash: number;
};

export {createHash} from './createHash';
export {updateHash} from './updateHash';
