import {Compute, Equals, Extends} from 'Any/_api';
import * as TT from 'ts-toolbelt';

const Test = {
  check: () => 1 as 1,
  checks: () => 1,
};

/**
 * Install dummy function implementations for checks and check, since
 * 'ts-toolbelt' only declares the ambient function definitions. This lets us
 * mix type-level and runtime tests.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(TT as any).default = {
  Test,
};

const checks = Test.checks;
const _check = Test.check;
type Pass = TT.Test.Pass;
type Fail = TT.Test.Fail;

// eslint-disable-next-line @typescript-eslint/ban-types
function checkExtends<Sub, Super, Outcome extends Pass | Fail>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug?: Compute<Sub>
): Equals<Extends<Sub, Super>, Outcome> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {} as any;
}

type Check = typeof _check & {
  extends: typeof checkExtends;
};

const check = _check as Check;
check.extends = checkExtends;

// function checkExtends<Type, Expect, Outcome extends Pass | Fail>(
//   debug?: Compute<Type>
// ): Equals<Extends<Type, Expect>, Outcome> {
//   return {} as any;
// }

export {Fail, Pass, check, checkExtends, checks};
