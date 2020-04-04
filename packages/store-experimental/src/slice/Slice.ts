import * as t from 'io-ts';

import {ConfigKey} from '../config';
import {ApiTypeOf} from '../node/api/ApiTypeOf';
import {SliceNodeTypeOf} from './node/SliceNodeTypeOf';
// import {Defer} from '@cleric/common';

// type _Slice<
//   TConfigKey extends ConfigKey,
//   P extends t.Any,
//   T extends t.Any
// > = ApiTypeOf<TConfigKey, T> & SliceNodeTypeOf<TConfigKey, P, T>;

export type Slice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> = ApiTypeOf<TConfigKey, T> & SliceNodeTypeOf<TConfigKey, P, T>;
