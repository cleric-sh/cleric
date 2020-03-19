import { SliceTypes } from '..';
import { SliceNodeKey } from './SliceNodeKey';
import { SliceNodes } from './SliceNodes';
import * as t from 'io-ts';

export const getSliceNodeCtor = <TSliceKey extends SliceNodeKey, T extends t.Any>(sliceKey: TSliceKey, type: T) => {
    const slice = SliceNodes[sliceKey];
    if (!slice)
        throw `Slice constructor '${sliceKey} is missing, have you forgotten to add it to the 'Slices' interface, or are you missing an import?'`;
    return slice as SliceTypes<T>[TSliceKey];
};
