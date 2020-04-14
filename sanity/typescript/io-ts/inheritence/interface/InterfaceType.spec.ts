import {Pass, checks, Fail} from '@cleric/common';
import * as t from 'io-ts';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import {FooBar, Foo, FooProps, FooBarProps, BarProps, Bar} from '../types';

describe('t.InterfaceType', () => {
  it('is assignable to t.Any', () => {
    checks([
      checkExtends<t.InterfaceType<t.Props>, t.Any, Pass>(),
      checkExtends<t.InterfaceType<FooBarProps>, t.Any, Pass>(),
      checkExtends<t.InterfaceType<FooProps>, t.Any, Pass>(),
      checkExtends<t.InterfaceType<BarProps>, t.Any, Pass>(),
    ]);
  });

  it('is assignable naturally based on props inheritability.', () => {
    checks([
      /**
       * However, an InterfaceType with props can be used as a supertype
       * of a TypeC and the relationship between the props is reflected
       * as expected.
       */
      checkExtends<FooBar, t.InterfaceType<FooBarProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<BarProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<FooProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<t.Props>, Pass>(),
      checkExtends<Foo, t.InterfaceType<BarProps>, Fail>(),
      checkExtends<Foo, t.InterfaceType<FooBarProps>, Fail>(),
      checkExtends<Bar, t.InterfaceType<FooBarProps>, Fail>(),
      checkExtends<t.Props, t.InterfaceType<FooBarProps>, Fail>(),
    ]);
  });
});
