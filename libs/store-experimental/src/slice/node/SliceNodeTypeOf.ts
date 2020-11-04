import * as t from 'io-ts';

import {ConfigKey, ConfigTypes} from '../../config';
import {SliceNodeTypes} from './SliceNodeTypes';

export type SliceNodeTypeOf<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = SliceNodeTypes<TConfigKey, P, T>[ConfigTypes[TConfigKey]['slice']];
