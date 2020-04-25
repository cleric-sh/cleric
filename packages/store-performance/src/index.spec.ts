import './perf';

import {Fail, Pass, checkExtends, checks} from '@cleric/common';
import {ApiNode, ConfigKey, createSlice} from '@cleric/store-experimental';
import {Subject} from 'rxjs';

import {Root, root} from './perf/types/Root';

describe('index', () => {
  it('should do stuff', () => {
    const src = new Subject();

    const parent = {$configKey: 'Perf', $: src, $type: root} as ApiNode<
      'Perf',
      Root
    >;

    const slice = createSlice(parent, root, f$ => f$);

    checks([
      checkExtends<'Perf', ConfigKey, Pass>(),
      checkExtends<'Default', ConfigKey, Fail>(),
      checkExtends<'Test', ConfigKey, Fail>(),
      checkExtends<'Foo', ConfigKey, Fail>(),
    ]);
  });
});
