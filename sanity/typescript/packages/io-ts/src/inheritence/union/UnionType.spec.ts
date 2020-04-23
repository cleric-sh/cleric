import {Fail, Pass, checks} from '@cleric/common';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import * as t from 'io-ts';
import {bar, foo} from '../types';

type BaseCS = t.Any[];

type CSOf<T extends t.UnionType<BaseCS>> = T extends t.UnionType<infer CS>
  ? CS
  : never;

describe('t.IntersectionType', () => {
  const baz = t.type({baz: t.string});

  const fooBar = t.union([foo, bar]);
  const fooBarBaz = t.union([foo, bar, baz]);

  type FooBar = typeof fooBar;
  type FooBarBaz = typeof fooBarBaz;

  type FooBarCS = CSOf<FooBar>;
  type FooBarBazCS = CSOf<FooBarBaz>;

  it(`doesn't have props with natural extensibility`, () => {
    checks([checkExtends<FooBarBazCS, FooBarCS, Fail>()]);
  });

  it(`doesn't have natural extensibility`, () => {
    checks([
      checkExtends<
        t.InterfaceType<FooBarBazCS>,
        t.InterfaceType<FooBarCS>,
        Fail
      >(),
    ]);
  });

  it('is assignable to t.Any', () => {
    checks([checkExtends<t.UnionType<BaseCS>, t.Any, Pass>()]);
    checks([checkExtends<t.UnionType<FooBarCS>, t.Any, Pass>()]);
    checks([checkExtends<FooBar, t.Any, Pass>()]);
  });

  it('IS assignable to base CS type', () => {
    checks([checkExtends<FooBar, t.UnionType<BaseCS>, Pass>()]);
  });

  it('is not contravariant', () => {
    checks([
      checkExtends<t.UnionType<BaseCS>, FooBar, Fail>(),
      checkExtends<t.UnionType<FooBarCS>, FooBarBaz, Fail>(),
    ]);
  });
});
