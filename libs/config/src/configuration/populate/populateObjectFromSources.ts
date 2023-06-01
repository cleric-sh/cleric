import {Misc} from 'ts-toolbelt';
import {Sources} from '../sources';
import {declaredPropertiesOf, isSettable} from '../utils/properties';
import {ensureNoMissingSources} from './ensureNoMissingSources';
import {getChildSourcePaths} from './getChildSourcePaths';
import {SourcePaths} from './getSourcePaths';
import {readValueFromSources} from './readValueFromSources';

export function populateObjectFromSources(
  sources: Sources,
  target: Misc.JSON.Object,
  parentCursor: SourcePaths,
  pathFromRoot: string[]
) {
  for (const property of declaredPropertiesOf(target)) {
    const {name} = property;

    const childCursor = getChildSourcePaths(parentCursor, target, name);
    const childPathFromRoot = [...pathFromRoot, name];
    ensureNoMissingSources(sources, childCursor, childPathFromRoot);

    const childTarget = target[name];

    if (Array.isArray(childTarget)) continue;

    if (typeof childTarget === 'object' && childTarget !== null) {
      populateObjectFromSources(sources, childTarget, childCursor, childPathFromRoot);
      continue;
    }

    if (isSettable(property)) {
      target[name] =
        readValueFromSources(sources, target, childCursor, childPathFromRoot) || childTarget;
    }
  }
}
