import {SliceConstructor} from './SliceConstructor';
import {SliceNodes} from './SliceNodes';

export const setSliceNode = <TSliceNode extends SliceConstructor>(
    sliceKey: string, nodeCtor: TSliceNode) => {
  SliceNodes[sliceKey] = nodeCtor;
  return nodeCtor;
};
