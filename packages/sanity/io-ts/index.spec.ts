import {Pass, check, checks, Fail} from '@cleric/common';
import {Extends} from 'Any/Extends';
import * as t from 'io-ts';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';

describe('t.InterfaceType', () => {
  it('is assignable to t.Any', () => {
    checks([check<Extends<t.InterfaceType<t.Any>, t.Any>, 1, Pass>()]);
  });

  it('is assignable to compatible props', () => {
    const foo = t.type({foo: t.string});
    const bar = t.type({bar: t.string});
    const fooBar = t.type({foo: t.string, bar: t.string});

    const intersection = t.intersection([foo, bar]);
    const union = t.union([foo, bar]);

    type intersectionObj = t.TypeOf<typeof intersection>;

    type fooObj = t.TypeOf<typeof foo>;
    type barObj = t.TypeOf<typeof bar>;
    type fooBarObj = t.TypeOf<typeof fooBar>;
    type _interfaceObj = t.TypeOf<t.InterfaceType<t.Props>>;
    type _intersectionObj = t.TypeOf<t.IntersectionC<[typeof foo, typeof bar]>>;
    type _unionObj = t.TypeOf<t.UnionC<[typeof foo, typeof bar]>>;

    checks([
      // We want out type object comparisons to be semantically the asme as this:
      checkExtends<fooBarObj, fooObj, Pass>(),

      // Doesn't extend type of super type.
      // Expected this to pass.
      checkExtends<typeof fooBar, typeof foo, Fail>(),

      // Doesn't extend TypeC with props of super type.
      // Expected this to pass.
      checkExtends<typeof fooBar, t.TypeC<{foo: t.StringC}>, Fail>(),
      checkExtends<typeof fooBar, t.TypeC<t.Props>, Fail>(),

      // Does extend TypeC with props of same type.
      checkExtends<typeof fooBar, typeof fooBar, Pass>(),
      checkExtends<
        typeof fooBar,
        t.TypeC<{foo: t.StringC; bar: t.StringC}>,
        Pass
      >(),
      check<typeof fooBar, typeof fooBar, Pass>(),
      check<typeof fooBar, t.TypeC<{foo: t.StringC; bar: t.StringC}>, Pass>(),

      // Does extend InterfaceType with props of super type
      checkExtends<typeof fooBar, t.InterfaceType<{foo: t.StringC}>, Pass>(),
      checkExtends<typeof fooBar, t.InterfaceType<t.Props>, Pass>(),
      checkExtends<
        typeof fooBar,
        t.InterfaceType<t.PropsOf<typeof foo>>,
        Pass
      >(),
    ]);
  });
});

describe('t.IntersectionType', () => {
  it('is assignable to t.Any', () => {
    checks([check<Extends<t.IntersectionType<t.Any[]>, t.Any>, 1, Pass>()]);
  });
});

describe('t.UnionType', () => {
  it('is assignable to t.Any', () => {
    checks([check<Extends<t.UnionType<t.Any[]>, t.Any>, 1, Pass>()]);
  });
});
