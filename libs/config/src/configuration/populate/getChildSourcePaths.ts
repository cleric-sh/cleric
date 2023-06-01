import {Misc} from 'ts-toolbelt';
import {applyBlocks} from './applyBlocks';
import {applyUses} from './applyUses';
import {SourcePaths} from './getSourcePaths';
import {pushPathToCursor} from './pushPathToCursor';

export function getChildSourcePaths(
  parent: SourcePaths,
  target: Misc.JSON.Object,
  propertyKey: string
) {
  let current: SourcePaths = pushPathToCursor(parent, propertyKey);
  current = applyBlocks(target, propertyKey, current);
  current = applyUses(target, propertyKey, current);
  return current;
}
