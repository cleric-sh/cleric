import { SliceTypes } from '..';
import { SliceNodeKey } from './SliceNodeKey';
import { SliceNodes } from './SliceNodes';
import { Constructor } from '@cleric/common/src/types';
import { ConfigKey } from '../../config';
import { SliceParentProps, SliceParentType } from './SliceNode';

export const getSliceNode = <
    TSliceKey extends SliceNodeKey,
    TConfigKey extends ConfigKey,
    P extends SliceParentType,
    K extends keyof SliceParentProps<P>>(sliceKey: TSliceKey, configKey: TConfigKey, parent: P, name: K) => {
    const slice = SliceNodes[sliceKey];
    if (!slice)
        throw `Slice constructor '${sliceKey} is missing, have you forgotten to add it to the 'Slices' interface, or are you missing an import?'`;
    const ctor = slice as unknown as Constructor<SliceTypes<TConfigKey, P, K>[TSliceKey]>;
    return new ctor(configKey, parent, name);
};
