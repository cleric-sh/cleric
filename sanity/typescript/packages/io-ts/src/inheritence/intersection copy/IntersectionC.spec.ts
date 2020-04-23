import {Fail, Pass, checks} from '@cleric/common';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import * as t from 'io-ts';
import {bar, foo} from '../types';

type BaseCS = [t.Mixed, t.Mixed, ...Array<t.Mixed>];

type CSOf<T extends t.IntersectionType<BaseCS>> = T extends t.IntersectionType<
  infer CS
>
  ? CS
  : never;

describe('t.IntersectionC', () => {
  const baz = t.type({baz: t.string});

  const fooBar = t.intersection([foo, bar]);
  const fooBarBaz = t.intersection([foo, bar, baz]);

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
    checks([checkExtends<t.IntersectionC<BaseCS>, t.Any, Pass>()]);
    checks([checkExtends<t.IntersectionC<FooBarCS>, t.Any, Pass>()]);
    checks([checkExtends<FooBar, t.Any, Pass>()]);
  });

  it('is not assignable to base CS type', () => {
    checks([checkExtends<FooBar, t.IntersectionC<BaseCS>, Fail>()]);
  });

  it('is not contravariant', () => {
    checks([
      checkExtends<FooBarCS, FooBarBazCS, Fail>(),
      checkExtends<FooBar, FooBarBaz, Fail>(),
      checkExtends<t.IntersectionC<BaseCS>, FooBar, Fail>(),
    ]);
  });
});
