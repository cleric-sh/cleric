import * as t from 'io-ts';

import {ConfigKey} from '../../config';

import {SliceNode} from './SliceNode';

export interface SliceNodeTypes<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> {
  SliceNode: SliceNode<TConfigKey, P, T>;
}
