import { merge, get } from 'lodash';
import { updateHash } from '@cleric/hash';
import { State } from './store';
import { set } from 'monolite';

export const applyMerge = (state: State<any>, path: string[], next: any) => {
  const { current: last, hash: lastHash } = state;

  const isRoot = !path || path.length <= 0;

  if (isRoot) {
    const current = merge({}, last, next);

    return {
      current,
      hash: updateHash(lastHash, path, current),
    };
  }
  const previous = get(last, path);
  const value = merge({}, previous, next);

  return {
    current: set(last, path, value),
    hash: updateHash(lastHash, path, value),
  };
};
