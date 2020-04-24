import * as t from 'io-ts';

import {ConfigKey} from '../config';
import {_ApiFor} from '../node/api';
import {SliceNodeTypeOf} from './node/SliceNodeTypeOf';

type Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = SliceNodeTypeOf<TConfigKey, P, T> & _ApiFor<TConfigKey, T>;

export type _Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = Slice<TConfigKey, P, T> extends infer X ? X : never;
