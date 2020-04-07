import * as t from 'io-ts';

import {ConfigKey} from '../config';
import {ApiFor} from '../node/api/ApiFor';
import {SliceNodeTypeOf} from './node/SliceNodeTypeOf';
import {Cast} from 'Any/Cast';
// import {Defer} from '@cleric/common';

type Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = ApiFor<TConfigKey, T> & SliceNodeTypeOf<TConfigKey, P, T>;

export type _Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = Slice<TConfigKey, P, T> extends infer X ? Cast<X, object> : never;
