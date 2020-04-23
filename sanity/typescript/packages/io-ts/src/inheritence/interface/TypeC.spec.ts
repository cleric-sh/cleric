import {Fail, Pass, check, checks} from '@cleric/common';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import * as t from 'io-ts';
import {BarProps, Foo, FooBar, FooBarProps, FooProps} from '../types';

describe('t.TypeC', () => {
  it('is assignable to t.Any', () => {
    checks([
      checkExtends<t.TypeC<t.Props>, t.Any, Pass>(),
      checkExtends<t.TypeC<FooBarProps>, t.Any, Pass>(),
      checkExtends<t.TypeC<FooProps>, t.Any, Pass>(),
      checkExtends<t.TypeC<BarProps>, t.Any, Pass>(),
    ]);
  });

  it('is assignable to another TypeC with same props', () => {
    checks([
      checkExtends<FooBar, t.TypeC<FooBarProps>, Pass>(),
      check<FooBar, t.TypeC<FooBarProps>, Pass>(),
    ]);
  });

  it('can be supertyped by InterfaceType, but not TypeC.', () => {
    checks([
      /**
       * UNEXPECTED
       * FooBar doesn't extend Foo.
       * In other words, a TypeC with props of a subType doesn't
       * extend a TypeC with props of super type, as we would expect.
       */
      checkExtends<FooBar, Foo, Fail>(),
      checkExtends<FooBar, t.TypeC<FooProps>, Fail>(),
      checkExtends<FooBar, t.TypeC<t.Props>, Fail>(),

      /**
       * They're also not contravariant, because Foo is not assignable to FooBar either.
       */
      checkExtends<Foo, FooBar, Fail>(),
    ]);
  });
});
