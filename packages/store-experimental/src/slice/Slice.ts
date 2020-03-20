import { ConfigKey } from '../config';
import { ApiTypeOf } from './api/ApiTypeOf';
import { SliceNodeTypeOf } from './node/SliceNodeTypeOf';
import { SliceParentType, SliceParentProps } from './node/SliceNode';

export type Slice<TConfigKey extends ConfigKey, P extends SliceParentType, K extends keyof SliceParentProps<P>> =
  SliceNodeTypeOf<TConfigKey, P, K> &
  ApiTypeOf<TConfigKey, SliceParentProps<P>[K]>;
