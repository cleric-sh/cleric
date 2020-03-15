import { SliceApis } from './apis';
import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { ConfigKey, Configs } from './config';

export const decorateSlice = (configKey: ConfigKey, type: t.Any, slice: SliceNode<t.Any>) => {
  const apis = Configs[configKey] as Readonly<SliceApis>;
  for (const api of apis) {
    if (api.guard(type)) api.decorate(configKey, type, slice);
  }
};
