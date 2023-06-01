import {Class} from 'Class/Class';
import {USE_METADATA_KEY} from '../decorators/Use';
import {getMetadata} from '../utils/reflect/getMetadata';

export function getUseSourceKeys(target: Class | Object, propertyKey?: string) {
  return getMetadata(USE_METADATA_KEY, target, propertyKey) || [];
}
