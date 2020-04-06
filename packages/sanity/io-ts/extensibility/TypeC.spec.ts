import {Pass, check, checks, Fail} from '@cleric/common';
import * as t from 'io-ts';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import {
  FooBarType,
  FooType,
  FooBar,
  Foo,
  FooProps,
  FooBarProps,
  BarProps,
  Bar,
} from './types';

describe('t.TypeC', () => {
  it('is assignable to t.Any', () => {
    checks([
      checkExtends<t.TypeC<t.Props>, t.Any, Pass>(),
      checkExtends<t.TypeC<FooBarProps>, t.Any, Pass>(),
      checkExtends<t.TypeC<FooProps>, t.Any, Pass>(),
      checkExtends<t.TypeC<BarProps>, t.Any, Pass>(),
    ]);
  });

  it('does NOT behave naturally', () => {
    checks([
      // We want our type object comparisons to be semantically the same as this:
      checkExtends<FooBarType, FooType, Pass>(),
      checkExtends<FooType, FooBarType, Fail>(),

      // UNEXPECTED: Doesn't extend type of super type.
      // Semantically, FooBar should extend Foo, since Foo is a supertype of FooBar.
      checkExtends<FooBar, Foo, Fail>(),
      checkExtends<FooBar, t.TypeC<FooProps>, Fail>(),
      checkExtends<FooBar, t.TypeC<t.Props>, Fail>(),

      checkExtends<Foo, FooBar, Fail>(),

      // Does extend TypeC with props of same type.
      checkExtends<FooBar, FooBar, Pass>(),
      checkExtends<FooBar, t.TypeC<FooBarProps>, Pass>(),

      // Also passes exact checks...
      check<FooBar, FooBar, Pass>(),
      check<FooBar, t.TypeC<FooBarProps>, Pass>(),

      // But an InterfaceType is not exactly the TypeC type.
      check<FooBar, t.InterfaceType<FooBarProps>, Fail>(),

      // Also expect exact checks on different props to fail.
      check<FooBar, Foo, Fail>(),
      check<FooBar, t.TypeC<FooProps>, Fail>(),
      check<FooBar, t.InterfaceType<FooProps>, Fail>(),

      // Does extend InterfaceType with props of super type
      checkExtends<FooBar, t.InterfaceType<FooBarProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<BarProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<FooProps>, Pass>(),
      checkExtends<FooBar, t.InterfaceType<t.Props>, Pass>(),

      // Doesn't extend InterfaceType with props of other types
      checkExtends<Foo, t.InterfaceType<FooBarProps>, Fail>(),
      checkExtends<Bar, t.InterfaceType<FooBarProps>, Fail>(),
    ]);
  });
});
