import { Observable } from 'rxjs';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { Slice } from './api';
import { ConfigKey } from './config';
import './config/default';
import { decorateSlice } from './decorateSlice';

export const createSlice = <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
  type: T,
  $: Observable<t.TypeOf<T>>,
  configKey?: TConfiguration,
) => {
  const configKeyOrDefault = configKey ?? 'Default';
  const slice = new SliceNode(configKeyOrDefault, type, $);
  decorateSlice(configKeyOrDefault, type, slice);
  return slice as Slice<TConfiguration, T>;
};
