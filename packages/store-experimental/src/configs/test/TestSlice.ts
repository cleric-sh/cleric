import { SliceNode } from '../../slice/node/SliceNode';
import * as t from 'io-ts';
import { Constructor } from '@cleric/common/src/types';
import { setSliceNodeCtor } from "../../slice/node/setSliceNodeCtor";

export class TestSlice<T extends t.Any> extends SliceNode<T> {

    doTest = () => 'Test';
}

setSliceNodeCtor('TestSlice', TestSlice);


declare module '../../slice/node' {
    interface SliceNodeTypes<T> {
        'TestSlice': Constructor<TestSlice<T>>
    }
}