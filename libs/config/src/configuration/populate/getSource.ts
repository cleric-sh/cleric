import {SourceKey, Sources} from '../sources';

export function getSource(sources: Sources, key: SourceKey) {
  for (const entry of sources) {
    const [sourceKey, source] = entry;
    if (sourceKey === key) return source;
  }
  return undefined;
}
