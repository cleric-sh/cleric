import { Observable } from 'rxjs';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { Slice } from './apis';
import { ConfigKey } from './config';
import './config/default';
import { getSliceConstructor } from './getSliceConstructor';
import { getMatchingApis } from './getMatchingApis';

export const createSlice = <T extends t.Any, TConfiguration extends ConfigKey = 'Default'>(
  type: T,
  $: Observable<t.TypeOf<T>>,
  configKey?: TConfiguration,
) => {
  const configKeyOrDefault = configKey ?? 'Default';
  const apis = getMatchingApis(configKeyOrDefault, [type]);
  const Constructor = getSliceConstructor(configKeyOrDefault, apis, type, SliceNode);
  const slice = new Constructor(configKeyOrDefault, type, $);
  return slice as Slice<TConfiguration, T>;
};
