import * as TT from 'ts-toolbelt';
import {Test} from 'ts-toolbelt';
import {Equals, Compute, Extends} from 'Any/_api';

/**
 * Install dummy function implementations for checks and check, since
 * 'ts-toolbelt' only declares the ambient function definitions. This lets us
 * mix type-level and runtime tests.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(TT as any).default.Test = {
  check: () => 1 as 1,
  checks: () => 1,
};

const checks = Test.checks;
const check = Test.check;
type Pass = Test.Pass;
type Fail = Test.Fail;

// eslint-disable-next-line @typescript-eslint/ban-types
function checkExtends<Sub, Super, Outcome extends Pass | Fail>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug?: Compute<Sub>
): Equals<Extends<Sub, Super>, Outcome> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {} as any;
}

// function checkExtends<Type, Expect, Outcome extends Pass | Fail>(
//   debug?: Compute<Type>
// ): Equals<Extends<Type, Expect>, Outcome> {
//   return {} as any;
// }

export {Fail, Pass, check, checks, checkExtends};
