import '@cleric/store-experimental/src/slice/node';

import * as t from 'io-ts';

import {ConfigKey} from '@cleric/store-experimental/src/config';
import {SliceNode} from '@cleric/store-experimental/src/slice/node/SliceNode';
import {registerSliceNode} from '@cleric/store-experimental/src/slice/node/registerSliceNode';

export class PerfSlice<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> extends SliceNode<TConfigKey, P, T> {
  doPerfFromPerfNode = () => 'Perf';
}

registerSliceNode('PerfSlice', PerfSlice);

declare module '@cleric/store-experimental/src/slice/node' {
  interface SliceNodeTypes<
    TConfigKey extends ConfigKey,
    P extends t.Any,
    T extends t.Any
  > {
    PerfSlice: PerfSlice<TConfigKey, P, T>;
  }
}
