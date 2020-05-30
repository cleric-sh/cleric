import {Compute, Equals, Extends} from 'Any/_api';
import TT, {Test as TTest} from 'ts-toolbelt';

/**
 * Get types of existing implementations
 */
const _check = TTest.check;
const _checks = TTest.checks;
type _Check = typeof _check;
type _Checks = typeof _checks;

type Pass = TTest.Pass;
type Fail = TTest.Fail;

// eslint-disable-next-line @typescript-eslint/ban-types
function checkExtends<Sub, Super, Outcome extends Pass | Fail>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  debug?: Compute<Sub>
): Equals<Extends<Sub, Super>, Outcome> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {} as any;
}

type Checks = _Checks & {
  // add extensions here.
};

type Check = _Check & {
  extends: typeof checkExtends;
};

const Test = {
  check: ((() => undefined) as unknown) as Check,
  checks: ((() => undefined) as unknown) as Checks,
};

const check = Test.check;
Test.check.extends = checkExtends;

const checks = Test.checks;

/**
 * Install dummy function implementations for checks and check, since
 * 'ts-toolbelt' only declares the ambient function definitions. This lets us
 * mix type-level and runtime tests.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(TT as any).default = {
  Test,
};

export {Fail, Pass, check, checkExtends, checks};
