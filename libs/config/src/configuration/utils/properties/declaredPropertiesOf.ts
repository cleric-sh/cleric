import {from} from 'ix/iterable';
import {filter} from 'ix/iterable/operators';
import {allPropertiesOf} from './allPropertiesOf';
import {PropertyInfo} from './index';

export function* declaredPropertiesOf(target: Object): Iterable<PropertyInfo> {
  yield* from(allPropertiesOf(target)).pipe(filter(i => i.name !== 'constructor'));
}
