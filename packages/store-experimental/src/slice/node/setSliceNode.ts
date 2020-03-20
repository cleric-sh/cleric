import { SliceNodes } from './SliceNodes';
import { SliceConstructor } from './SliceConstructor';

export const setSliceNode = <TSliceNode extends SliceConstructor>(sliceKey: string, nodeCtor: TSliceNode) => {
    SliceNodes[sliceKey] = nodeCtor;
    return nodeCtor;
};
