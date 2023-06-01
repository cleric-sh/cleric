import {SourceKey} from '../sources';
import {SourcePaths} from './getSourcePaths';

export function removeSourcesFromCursor(cursor: SourcePaths, keys: SourceKey[]) {
  const newCursor: SourcePaths = {...cursor};
  for (const key of keys) {
    delete newCursor[key];
  }
  return newCursor;
}
