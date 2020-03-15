import { SliceNode } from './SliceNode';
import { ConfigKey, SliceApis } from './config';
import * as t from 'io-ts';

export const getSliceConstructor = <TSliceNode extends Constructor<SliceNode<t.Any>>>(
  configKey: ConfigKey,
  apis: SliceApis,
  type: t.Any,
  ctor: TSliceNode,
) => {
  let Constructor = ctor;
  for (const api of apis) {
    Constructor = api.mixin(configKey, type, Constructor);
  }
  return Constructor;
};
