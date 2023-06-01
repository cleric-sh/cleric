import 'reflect-metadata';
import {SourceKey} from '../sources';

export const BLOCK_METADATA_KEY = 'BLOCK';

export function Block(...sources: SourceKey[]) {
  return Reflect.metadata(BLOCK_METADATA_KEY, sources);
}
