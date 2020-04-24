import * as t from 'io-ts';

import './perf';

import {Fail, Pass, checkExtends, checks} from '@cleric/common';
import {ApiNode, ConfigKey, createSlice} from '@cleric/store-experimental';

import {_Slice} from '@cleric/store-experimental/src/slice/Slice';
import {Subject} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {Root, root} from './perf/types/Root';
import {Type1, type1} from './perf/types/Type1';
import {Type2, type2} from './perf/types/Type2';

describe('index', () => {
  it('should do stuff', () => {
    type actual = {};
    type expected = {};

    const src = new Subject();

    const parent = {$configKey: 'Perf', $: src, $type: root} as ApiNode<
      'Perf',
      typeof root
    >;

    const slice = createSlice(parent, root, f$ => f$);

    // Why does using _Slice with t.RecursiveType break _Slice?

    // We CAN map a recursive type.
    type Foo = {
      foo: Foo;
    };

    type Map<T> = {
      [P in keyof T]: _Map<T[P]>;
    };

    type _Map<T> = Map<T> extends infer X ? X : never;

    type FooMap = _Map<Foo>;
    const foo: FooMap;

    checks([
      checkExtends<'Perf', ConfigKey, Pass>(),
      checkExtends<'Default', ConfigKey, Fail>(),
      checkExtends<'Test', ConfigKey, Fail>(),
      checkExtends<'Foo', ConfigKey, Fail>(),
    ]);
  });
});
