import { ConfigKey, ConfigTypes } from '../../config';
import { SliceNodeTypes } from './SliceNodeTypes';
import { SliceParentProps } from "./SliceParentProps";
import { SliceParentType } from "./SliceParentType";

export type SliceNodeTypeOf<TConfigKey extends ConfigKey, P extends SliceParentType, K extends keyof SliceParentProps<P>> = SliceNodeTypes<TConfigKey, P, K>[ConfigTypes[TConfigKey]['slice']];
