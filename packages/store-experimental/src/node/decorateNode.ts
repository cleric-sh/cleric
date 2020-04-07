import * as t from 'io-ts';

import {ConfigKey, getConfig} from '../config';

import {ApiNode} from './ApiNode';

export const decorateNode = <TNode extends t.Any, T extends t.Any = TNode>(
  node: ApiNode<ConfigKey, TNode>,
  type: T
) => {
  const {apis} = getConfig(node.$configKey);
  for (const api of apis) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (api.guard(node.$type)) api.decorator(node as any, type as any);
  }
};
