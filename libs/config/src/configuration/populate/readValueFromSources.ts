import {Misc} from 'ts-toolbelt';
import {MissingSourceError} from '../errors/MissingSourceError';
import {Sources} from '../sources';
import {SourcePaths} from './getSourcePaths';

export function readValueFromSources(
  sources: Sources,
  target: Partial<Misc.JSON.Object>,
  sourcePaths: SourcePaths,
  pathFromRoot: string[]
) {
  // Step through each source in the order defined in 'sources'.
  for (const entry of sources) {
    const [key, source] = entry;
    const sourcePath = sourcePaths[key];

    // Skip this iteration if the cursor doesn't need to read from this source.
    if (!sourcePath) continue;

    if (!source) {
      throw new MissingSourceError(key, pathFromRoot);
    }

    const value = source.get(target, ...sourcePath);

    if (value) return value;
  }
  return undefined;
}
