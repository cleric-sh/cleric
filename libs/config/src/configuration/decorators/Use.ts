import 'reflect-metadata';
import {SourceKey} from '../sources';

export const USE_METADATA_KEY = 'tibber:SOURCES';

export function Use(...sources: SourceKey[]) {
  return Reflect.metadata(USE_METADATA_KEY, sources);
}
