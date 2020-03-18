import { Observable } from 'rxjs';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { ConfigKey } from './config';
import { Slice } from './Slice';

// Import the default configuration, so that it's always available.
import './default';

export const createSlice = <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
  type: T,
  $: Observable<t.TypeOf<T>>,
  configKey?: TConfiguration,
) => new SliceNode(type, $, configKey) as Slice<TConfiguration, T>;
