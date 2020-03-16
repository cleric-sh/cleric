import * as TT from 'ts-toolbelt';
import { Test } from 'ts-toolbelt';

/**
 * Install dummy function implementations for checks and check, since 'ts-toolbelt' only declares
 * the ambient function definitions. This lets us mix type-level and runtime tests.
 */
(TT as any).default.Test = {
  checks: (...args: any[]) => {},
  check: (...args: any[]) => 1 as 1,
};

export { Test };
