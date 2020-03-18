import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { ConfigKey, getConfig } from '../config';

export const decorateSlice = (configKey: ConfigKey, type: t.Any, slice: SliceNode<t.Any>) => {
  const { apis } = getConfig(configKey);
  for (const api of apis) {
    if (api.guard(type)) api.decorate(configKey, type as any, slice as any);
  }
};
