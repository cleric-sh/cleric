import * as t from 'io-ts';

import {Constructor} from '@cleric/common/src/types';
import {ConfigKey} from '../../config';

import {SliceTypes} from '..';
import {ApiNode} from '../../node/ApiNode';
import {Slice$Selector} from './Slice$Selector';
import {SliceNodeKey} from './SliceNodeKey';
import {SliceNodes} from './SliceNodes';

export const constructSliceNode = <
  TSliceKey extends SliceNodeKey,
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
>(
  sliceKey: TSliceKey,
  parent: ApiNode<TConfigKey, P>,
  type: T,
  selector: Slice$Selector<P, T>
) => {
  const slice = SliceNodes[sliceKey];
  console.log(SliceNodes);
  if (!slice)
    throw `Slice constructor '${sliceKey}' is missing, have you forgotten to add it to the 'Slices' interface, or are you missing an import?'`;
  const ctor = (slice as unknown) as Constructor<
    SliceTypes<TConfigKey, P, T>[TSliceKey]
  >;
  return new ctor(parent, type, selector);
};
