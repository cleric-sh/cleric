import {allPropertiesOf} from './allPropertiesOf';
import {PropertyInfo} from './index';

export function* declaredPropertiesOf(target: Object): Iterable<PropertyInfo> {
  for (const property of allPropertiesOf(target)) {
    if (property.name === 'constructor') continue;
    yield property;
  }
}
