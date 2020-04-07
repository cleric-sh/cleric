import * as t from 'io-ts';

import {ConfigKey} from '../config';
import {_ApiFor} from '../node/api';
import {SliceNodeTypeOf} from './node/SliceNodeTypeOf';
import {Cast} from 'Any/Cast';

type Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = _ApiFor<TConfigKey, T> & SliceNodeTypeOf<TConfigKey, P, T>;

export type _Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = Slice<TConfigKey, P, T> extends infer X ? Cast<X, object> : never;
