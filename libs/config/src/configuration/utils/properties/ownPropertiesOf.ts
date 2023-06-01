import {PropertyInfo} from './index';

export function* ownPropertiesOf(target: Object): Iterable<PropertyInfo> {
  const names = Object.getOwnPropertyNames(target);
  const descriptors = Object.getOwnPropertyDescriptors(target);

  for (const name of names) {
    yield {
      name,
      descriptor: descriptors[name],
    };
  }
}
