import { SliceNode } from './SliceNode';
import { ConfigKey, SliceApis } from './config';
import * as t from 'io-ts';
import { Types } from '@cleric/common';

export const getSliceConstructor = <TSliceNode extends Types.Constructor<SliceNode<t.Any>>>(
  configKey: ConfigKey,
  apis: SliceApis,
  type: t.Any,
  base: TSliceNode,
) => {
  let Constructor = base;
  for (const api of apis) {
    Constructor = api.mixin(configKey, type, Constructor);
  }
  return Constructor;
};
