import { ConfigKey } from '../config';
import { ApiTypeOf } from './api/ApiTypeOf';
import * as t from 'io-ts';
import { SliceTypeOf } from './SliceTypeOf';

export type Slice<TConfigKey extends ConfigKey, T extends t.Any> = SliceTypeOf<TConfigKey, T> &
  ApiTypeOf<TConfigKey, T>;
