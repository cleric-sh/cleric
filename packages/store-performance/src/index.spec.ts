import * as t from 'io-ts';

import './perf';

import {Fail, Pass, checkExtends, checks} from '@cleric/common';
import {ApiNode, ConfigKey, createSlice} from '@cleric/store-experimental';

import {Subject} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {Root, root} from './perf/types/Root';
import {Type1, type1} from './perf/types/Type1';

describe('index', () => {
  it('should do stuff', () => {
    type actual = {};
    type expected = {};

    const src = new Subject();

    const node = {$configKey: 'Perf', $: src, $type: type1} as ApiNode<
      'Perf',
      Type1
    >;

    const slice = createSlice(node, type1, f$ => f$.pipe(pluck('foo')));

    checks([
      checkExtends<'Perf', ConfigKey, Pass>(),
      checkExtends<'Default', ConfigKey, Pass>(),
      checkExtends<'Test', ConfigKey, Fail>(),
      checkExtends<'Foo', ConfigKey, Fail>(),
    ]);
  });
});
