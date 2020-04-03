import * as t from 'io-ts';

import {ConfigKey} from '../../config';
import {SliceNode} from '../../slice/node/SliceNode';
import {registerSliceNode} from '../../slice/node/registerSliceNode';
export class TestSlice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> extends SliceNode<TConfigKey, P, T> {
  doTest = () => 'Test';
}

registerSliceNode('TestSlice', TestSlice);

declare module '../../slice/node' {
  interface SliceNodeTypes<
    TConfigKey extends ConfigKey,
    P extends t.Any,
    T extends t.Any
  > {
    TestSlice: TestSlice<TConfigKey, P, T>;
  }
}
