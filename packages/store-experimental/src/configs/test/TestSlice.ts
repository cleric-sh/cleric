import { SliceNode, SliceParentProps } from '../../slice/node/SliceNode';
import * as t from 'io-ts';
import { setSliceNode } from "../../slice/node/setSliceNode";
import { ConfigKey } from '../../config';

export class TestSlice<TConfigKey extends ConfigKey, P extends t.InterfaceType<t.Props>, K extends keyof SliceParentProps<P>> extends SliceNode<TConfigKey, P, K> {

    doTest = () => 'Test';
}

setSliceNode('TestSlice', TestSlice);

declare module '../../slice/node' {
    interface SliceNodeTypes<TConfigKey extends ConfigKey, P extends t.InterfaceType<t.Props>, K extends keyof SliceParentProps<P>> {
        'TestSlice': TestSlice<TConfigKey, P, K>
    }
}