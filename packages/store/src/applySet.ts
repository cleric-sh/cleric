import { updateHash } from '@cleric/hash';
import { State } from './store';
import { setFromAccessorChain } from 'monolite';
import { createState } from './createState';

export const applySet = (state: State<any>, path: string[], next: any) => {
  const { current: last, hash: lastHash } = state;

  const isRoot = !path || path.length <= 0;

  if (isRoot) {
    return createState(next);
  }

  return {
    current: setFromAccessorChain(last, path)(next),
    hash: updateHash(lastHash, path, next),
  };
};
