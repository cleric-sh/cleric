import { ConfigKey, getConfig } from '../config';
import { Slice } from './Slice';

// Import the default configuration, so that it's always available.
import '../configs/default';
import { getSliceNode } from './node/getSliceNode';
import { SliceParentProps } from "./node/SliceParentProps";
import { SliceParentType } from "./node/SliceParentType";
import { ApiNode } from "../node/ApiNode";

export const createSlice = <P extends SliceParentType, K extends keyof SliceParentProps<P>, TConfigKey extends ConfigKey = 'Default'>(
  $parent: ApiNode<TConfigKey, P>,
  $name: K
) => {
  const config = getConfig($parent.$configKey);
  const slice = getSliceNode(config.slice, $parent.$configKey, $parent.$type, $name);
  return slice as Slice<TConfigKey, P, K>;
};
