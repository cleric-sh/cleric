/* eslint-disable @typescript-eslint/no-explicit-any */
import {checks, Pass, Fail} from '@cleric/common';
import {checkExtends} from '@cleric/common/src/ts-toolbelt/Test';

describe('never', () => {
  it(`is never assignable.`, () => {
    checks([
      /**
       * In other words, 'never' never extends another type.
       */
      checkExtends<never, {}, Fail>(),
      checkExtends<never, any, Fail>(),
      checkExtends<never, unknown, Fail>(),
      checkExtends<never, never, Fail>(),
    ]);
  });

  it(`nothing is assignable to never, ever.`, () => {
    checks([
      /**
       * In other words, other types may never extend 'never'.
       */
      checkExtends<{}, never, Fail>(),
      checkExtends<unknown, never, Fail>(),
      checkExtends<never, never, Fail>(),
      /**
       * Except for any, which is indeterminable.
       */
      checkExtends<any, never, Pass | Fail>(),
    ]);
  });
});
