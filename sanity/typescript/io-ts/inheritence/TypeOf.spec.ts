import {Pass, checks, Fail} from '@cleric/common';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';
import {FooBarType, FooType} from './types';

describe('t.TypeOf', () => {
  it('returns underlying types that are assignable naturally.', () => {
    checks([
      /**
       * Also, the underlying types of FooBar and Foo behave as expected.
       * Ideally, we want FooBar and Foo to behave the same as the types they
       * represent.
       *
       * In other words, the type of FooBar extends the type of Foo.
       */
      checkExtends<FooBarType, FooType, Pass>(),
      checkExtends<FooType, FooBarType, Fail>(),
    ]);
  });
});
