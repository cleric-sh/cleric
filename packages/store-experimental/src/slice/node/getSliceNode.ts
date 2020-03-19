import { SliceTypes } from '..';
import { SliceNodeKey } from './SliceNodeKey';
import { SliceNodes } from './SliceNodes';
import * as t from 'io-ts';
import { Constructor } from '@cleric/common/src/types';

export const getSliceNode = <TSliceKey extends SliceNodeKey, T extends t.Any>(sliceKey: TSliceKey, type: T) => {
    const slice = SliceNodes[sliceKey];
    if (!slice)
        throw `Slice constructor '${sliceKey} is missing, have you forgotten to add it to the 'Slices' interface, or are you missing an import?'`;
    return slice as unknown as Constructor<SliceTypes<T>[TSliceKey]>;
};
