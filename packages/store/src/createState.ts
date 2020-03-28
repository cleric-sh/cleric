import {createHash} from '@cleric/hash';

import {State} from './store';

export const createState = <T>(state: T): State<T> => ({
  current : state,
  hash : createHash(state),
});
