import {declaredPropertiesOf} from './declaredPropertiesOf';
import {PropertyInfo} from './index';
import {ownPropertiesOf} from './ownPropertiesOf';

export function* allPropertiesOf(target: Object): Iterable<PropertyInfo> {
  yield* ownPropertiesOf(target);

  const prototype = Object.getPrototypeOf(target);

  if (!prototype || prototype === Object.prototype) return;

  yield* declaredPropertiesOf(prototype);
}
