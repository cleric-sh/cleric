import {ConfigKey} from '../config';
import {ApiTypeOf} from '../node/api/ApiTypeOf';
import {SliceNodeTypeOf} from './node/SliceNodeTypeOf';
import {SliceParentProps} from './node/SliceParentProps';
import {SliceParentType} from './node/SliceParentType';

export type Slice<
  TConfigKey extends ConfigKey,
  P extends SliceParentType,
  K extends keyof SliceParentProps<P>
> = ApiTypeOf<TConfigKey, SliceParentProps<P>[K]> &
  SliceNodeTypeOf<TConfigKey, P, K>;
