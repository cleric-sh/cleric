import { Observable } from 'rxjs';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { Slice } from './apis';
import { ConfigKey } from './config';
import './config/default';
import { getSliceConstructor } from './getSliceConstructor';
import { getMatchingApis } from './getMatchingApis';

interface CreateSlice {
  <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
    $type: T,
    $: Observable<t.TypeOf<T>>,
    configuration?: TConfiguration,
  ): Slice<TConfiguration, T>;
}

export const createSlice: CreateSlice = (type, $, configKey) => {
  const configKeyOrDefault = configKey ?? 'Default';
  const apis = getMatchingApis(configKeyOrDefault, [type]);
  const Constructor = getSliceConstructor(configKeyOrDefault, apis, type, SliceNode);
  const slice = new Constructor(configKey, type, $);
  // decorateSlice(configKeyOrDefault, type, slice);
  return slice as Slice<typeof configKey, typeof type>;
};
