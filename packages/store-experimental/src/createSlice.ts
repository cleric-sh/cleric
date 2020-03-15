import { Observable } from 'rxjs';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { Slice } from './apis';
import { decorateSlice } from './decorateSlice';
import { ConfigKey } from './config';
import './config/default';

interface CreateSlice {
  <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
    $type: T,
    $: Observable<t.TypeOf<T>>,
    configuration?: TConfiguration,
  ): Slice<TConfiguration, T>;
}

export const createSlice: CreateSlice = (type, $, configuration) => {
  const slice = new SliceNode(type, $);
  decorateSlice(configuration, type, slice);
  return slice as Slice<typeof configuration, typeof type>;
};
