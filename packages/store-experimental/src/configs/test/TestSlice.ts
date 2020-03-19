import { SliceNode } from '../../slice/node/SliceNode';
import * as t from 'io-ts';
import { setSliceNode } from "../../slice/node/setSliceNode";

export class TestSlice<T extends t.Any> extends SliceNode<T> {

    doTest = () => 'Test';
}

setSliceNode('TestSlice', TestSlice);

declare module '../../slice/node' {
    interface SliceNodeTypes<T> {
        'TestSlice': TestSlice<T>
    }
}