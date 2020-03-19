import { SliceNode } from './SliceNode';
import { Constructor } from '@cleric/common/src/types';
import { SliceNodes } from './SliceNodes';
import * as t from 'io-ts';

export const setSliceNodeCtor = <TSliceNode extends Constructor<SliceNode<t.Any>>>(sliceKey: string, nodeCtor: TSliceNode) => {
    SliceNodes[sliceKey] = nodeCtor;
    return nodeCtor;
};
