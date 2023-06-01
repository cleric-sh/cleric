import {Class} from 'Class/Class';
import {BLOCK_METADATA_KEY} from '../decorators/Block';
import {getMetadata} from '../utils/reflect/getMetadata';
import {SourcePaths} from './getSourcePaths';
import {removeSourcesFromCursor} from './removeSourcesFromCursor';

export function applyBlocks(target: Class | Object, propertyKey: string, current: SourcePaths) {
  const blockKeys = getMetadata(BLOCK_METADATA_KEY, target, propertyKey);
  if (blockKeys) {
    current = removeSourcesFromCursor(current, blockKeys);
  }
  return current;
}
