import * as t from 'io-ts';

import {ConfigKey, getConfig} from '../config';

import {ApiNode} from './ApiNode';

export const decorateNode = <TConfigKey extends ConfigKey, T extends t.Any>(
  configKey: TConfigKey,
  type: T,
  node: ApiNode<TConfigKey, T>
) => {
  const {apis} = getConfig(configKey);
  for (const api of apis) {
    if (api.guard(type)) api.decorate(configKey, type as any, node as any);
  }
};
