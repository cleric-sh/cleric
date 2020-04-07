import {Pass, checks, Fail} from '@cleric/common';
import * as t from 'io-ts';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import {foo, bar} from '../types';

type BaseCS = [t.Mixed, t.Mixed, ...Array<t.Mixed>];

type CSOf<T extends t.UnionType<BaseCS>> = T extends t.UnionType<infer CS>
  ? CS
  : never;

describe('t.UnionC', () => {
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
    checks([checkExtends<FooBarBaz, FooBar, Fail>()]);
  });

  it('is assignable to t.Any', () => {
    checks([checkExtends<t.UnionC<BaseCS>, t.Any, Pass>()]);
    checks([checkExtends<t.UnionC<FooBarCS>, t.Any, Pass>()]);
    checks([checkExtends<FooBar, t.Any, Pass>()]);
  });

  it('is not assignable to base CS type', () => {
    checks([checkExtends<FooBar, t.UnionC<BaseCS>, Fail>()]);
  });

  it('is not contravariant', () => {
    checks([
      checkExtends<FooBarCS, FooBarBazCS, Fail>(),
      checkExtends<FooBar, FooBarBaz, Fail>(),
      checkExtends<t.UnionC<BaseCS>, FooBar, Fail>(),
    ]);
  });
});
