import {Types} from '@cleric/common';

export type HashState<T, THashable = Types.FilterExclude<T, Function>> = {
  [P in keyof THashable]: HashState<THashable[P]>;
}&{
  __hash: number;
};

export {createHash} from './createHash';
export {updateHash} from './updateHash';
