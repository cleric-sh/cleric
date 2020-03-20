import { SliceNode, SliceParentType, SliceParentProps } from './SliceNode';
import { Constructor } from '@cleric/common/src/types';
import { SliceNodes } from './SliceNodes';
import { ConfigKey } from '../../config';

export type SliceConstructor = Constructor<SliceNode<ConfigKey, SliceParentType, keyof SliceParentProps<SliceParentType>>>;

export const setSliceNode = <TSliceNode extends SliceConstructor>(sliceKey: string, nodeCtor: TSliceNode) => {
    SliceNodes[sliceKey] = nodeCtor;
    return nodeCtor;
};
