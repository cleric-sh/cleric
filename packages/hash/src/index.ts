import { Utils } from '@cleric/common/rxjs';

export type HashState<T, THashable = Utils.FilterExclude<T, Function>> = {
  [P in keyof THashable]: HashState<THashable[P]>;
} & {
  __hash: number;
};

export { createHash } from './createHash';
export { updateHash } from './updateHash';
