import * as t from 'io-ts';

import {ConfigKey, getConfig} from '../config';

import {ApiNode} from './ApiNode';

export const decorateNode = <
  TConfigKey extends ConfigKey,
  TNode extends t.Any,
  T extends t.Any = TNode
>(
  node: ApiNode<TConfigKey, TNode>,
  type: T
) => {
  const {apis} = getConfig(node.$configKey);
  for (const api of apis) {
    if (api.guard(node.$type)) api.decorate(node as any, type as any);
  }
};
