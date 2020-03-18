import * as TT from 'ts-toolbelt';
import { Test } from 'ts-toolbelt';

/**
 * Install dummy function implementations for checks and check, since 'ts-toolbelt' only declares
 * the ambient function definitions. This lets us mix type-level and runtime tests.
 */
(TT as any).default.Test = {
  checks: () => {},
  check: () => 1 as 1,
};

const checks = Test.checks;
const check = Test.check;
type Pass = Test.Pass;
type Fail = Test.Fail;

export { Test, checks, check, Pass, Fail };
