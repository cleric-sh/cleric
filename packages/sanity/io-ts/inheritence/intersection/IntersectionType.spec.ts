import {Pass, checks, Fail} from '@cleric/common';
import * as t from 'io-ts';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import {foo, bar} from '../types';

type BaseCS = t.Any[];

type CSOf<T extends t.IntersectionType<BaseCS>> = T extends t.IntersectionType<
  infer CS
>
  ? CS
  : never;

describe('t.IntersectionType', () => {
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
    checks([
      checkExtends<
        t.InterfaceType<FooBarBazCS>,
        t.InterfaceType<FooBarCS>,
        Fail
      >(),
    ]);
  });

  it('is assignable to t.Any', () => {
    checks([checkExtends<t.IntersectionType<BaseCS>, t.Any, Pass>()]);
    checks([checkExtends<t.IntersectionType<FooBarCS>, t.Any, Pass>()]);
    checks([checkExtends<FooBar, t.Any, Pass>()]);
  });

  it('IS assignable to base CS type', () => {
    checks([checkExtends<FooBar, t.IntersectionType<BaseCS>, Pass>()]);
  });

  it('is not contravariant', () => {
    checks([
      checkExtends<t.IntersectionType<BaseCS>, FooBar, Fail>(),
      checkExtends<t.IntersectionType<FooBarCS>, FooBarBaz, Fail>(),
    ]);
  });
});
