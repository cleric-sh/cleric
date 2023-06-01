import {MissingSourceError} from '../errors/MissingSourceError';
import {SourceKey, Sources} from '../sources';
import {getSource} from './getSource';
import {SourcePaths} from './getSourcePaths';

export function ensureNoMissingSources(
  sources: Sources,
  cursor: SourcePaths,
  pathFromRoot: string[]
) {
  for (const key in cursor) {
    const _key = key as SourceKey;
    const source = getSource(sources, _key);
    if (!source) throw new MissingSourceError(key, pathFromRoot);
  }
}
