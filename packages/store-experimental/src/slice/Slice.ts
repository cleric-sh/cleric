import { ConfigKey } from '../config';
import { ApiTypeOf } from './api/ApiTypeOf';
import * as t from 'io-ts';
import { SliceNodeTypeOf } from './node/SliceNodeTypeOf';

export type Slice<TConfigKey extends ConfigKey, T extends t.Any> = SliceNodeTypeOf<TConfigKey, T> &
  ApiTypeOf<TConfigKey, T>;
