import {Class} from 'Class/Class';
import {Parameters} from 'Class/Parameters';
import {Misc} from 'ts-toolbelt';
import {Sources} from '../sources';
import {getSourcePaths} from './getSourcePaths';
import {populateObjectFromSources} from './populateObjectFromSources';

export function populate<TClass extends Class>(
  from: Sources,
  ctor: TClass,
  ...args: Parameters<TClass>
) {
  const settings = new ctor(...args) as Misc.JSON.Object;
  const sources = getSourcePaths(ctor);
  populateObjectFromSources(from, settings, sources, []);
  return settings as InstanceType<TClass>;
}
