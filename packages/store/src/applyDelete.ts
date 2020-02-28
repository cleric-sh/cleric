import { updateHash } from '@cleric/hash';
import { State } from './store';
import { createHash } from '@cleric/hash';
import { set } from 'monolite';
import { get, omit } from 'lodash';

export const applyDelete = (state: State<any>, path: string[]) => {
  const { current: last, hash: lastHash } = state;

  const isRoot = !path || path.length <= 0;

  if (isRoot) {
    return {
      current: undefined,
      hash: createHash(undefined),
    };
  }

  const nameToDelete = path[path.length - 1];
  const parentPath = path.slice(0, path.length - 1);
  const parent = get(state.current, parentPath) || state.current;
  const newParent = omit(parent, nameToDelete);
  return {
    current: set(last, parentPath, newParent),
    hash: updateHash(lastHash, parentPath, newParent),
  };
};
