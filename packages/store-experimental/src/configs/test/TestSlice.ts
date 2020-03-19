import { SliceNode } from '../../slice/SliceNode';
import * as t from 'io-ts';
import { Constructor } from '@cleric/common/src/types';
import { createSliceNodeCtor } from '../../slice/createSlice';

export class TestSlice<T extends t.Any> extends SliceNode<T> {

    doTest = () => 'Test';
}

createSliceNodeCtor('TestSlice', TestSlice);


declare module '../../slice' {
    interface SliceTypes<T> {
        'TestSlice': Constructor<TestSlice<T>>
    }
}