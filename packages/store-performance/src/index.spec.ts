import * as t from 'io-ts';

import './perf';

import {Fail, Pass, checkExtends, checks} from '@cleric/common';
import {ApiNode, ConfigKey, createSlice} from '@cleric/store-experimental';

import {Subject} from 'rxjs';
import {pluck} from 'rxjs/operators';

describe('index', () => {
  it('should do stuff', () => {
    type actual = {};
    type expected = {};

    const Foo = t.type({foo: t.string});

    const src = new Subject();

    const node = {$configKey: 'Perf', $: src, $type: Foo} as ApiNode<
      'Perf',
      typeof Foo
    >;

    createSlice(node, t.string, f$ => f$.pipe(pluck('foo')));

    checks([
      checkExtends<'Perf', ConfigKey, Pass>(),
      checkExtends<'Default', ConfigKey, Pass>(),
      checkExtends<'Test', ConfigKey, Fail>(),
      checkExtends<'Foo', ConfigKey, Fail>(),
    ]);
  });
});
