import { SliceNode } from './SliceNode';
import { ConfigKey } from './config';
import { ApiFor } from './api/ApiFor';
import * as t from 'io-ts';

export type Slice<TConfigKey extends ConfigKey, T extends t.Any> = SliceNode<T> &
  ApiFor<TConfigKey, T>;
