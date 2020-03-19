import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey, getConfig } from '../config';
import { Slice } from './Slice';

// Import the default configuration, so that it's always available.
import '../configs/default';
import { getSliceNode } from './node/getSliceNode';

export const createSlice = <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
  type: T,
  $: Observable<t.TypeOf<T>>,
  configKey?: TConfiguration,
) => {
  const configKeyOrDefault = configKey ?? 'Default';
  const config = getConfig(configKeyOrDefault);
  const SliceNodeCtor = getSliceNode(config.slice, type);
  const slice = new SliceNodeCtor(type, $, configKeyOrDefault);
  return slice as Slice<TConfiguration, T>;
};
