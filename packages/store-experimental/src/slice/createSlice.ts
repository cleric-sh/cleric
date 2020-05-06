// Import the default configuration, so that it's always available.

import * as t from 'io-ts';

import {ConfigKey, getConfig} from '../config';
import {ApiNode} from '../node/ApiNode';

import {_Slice} from './Slice';
import {SliceSelector} from './node/SliceSelector';
import {constructSliceNode} from './node/constructSliceNode';

export const createSlice = <
  P extends t.Any,
  T extends t.Any,
  TConfigKey extends ConfigKey = 'Default'
>(
  $parent: ApiNode<TConfigKey, P>,
  $type: T,
  selector: SliceSelector<P, T>
) => {
  const config = getConfig($parent.$configKey);
  const slice = constructSliceNode(config.slice, $parent, $type, selector);
  return slice as _Slice<TConfigKey, P, T>;
};
