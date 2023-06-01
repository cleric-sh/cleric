import {SourceKey} from '../sources';
import {SourcePaths} from './getSourcePaths';

export function pushPathToCursor(cursor: SourcePaths, path: string) {
  const newCursor: SourcePaths = {};
  for (const key in cursor) {
    const _key = key as SourceKey;
    newCursor[_key] = [...(cursor[_key] || []), path];
  }
  return newCursor;
}
