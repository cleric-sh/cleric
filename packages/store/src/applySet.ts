import {updateHash} from '@cleric/hash';
import {set} from 'monolite';

import {createState} from './createState';
import {State} from './store';

export const applySet = (state: State<any>, path: string[], next: any) => {
  const {current: last, hash: lastHash} = state;

  const isRoot = !path || path.length <= 0;

  if (isRoot) {
    return createState(next);
  }

  return {
    current: set(last, path, next),
    hash: updateHash(lastHash, path, next),
  };
};
