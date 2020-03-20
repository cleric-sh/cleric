import { SliceNode } from './SliceNode';
import { SliceParentProps } from "./SliceParentProps";
import { SliceParentType } from "./SliceParentType";
import { Constructor } from '@cleric/common/src/types';
import { ConfigKey } from '../../config';

export type SliceConstructor = Constructor<SliceNode<ConfigKey, SliceParentType, keyof SliceParentProps<SliceParentType>>>;
