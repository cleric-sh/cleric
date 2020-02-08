import { State } from './store';
import { createHash } from '@cleric/hash';

export const createState = <T>(state: T): State<T> => ({
  current: state,
  hash: createHash(state),
});
