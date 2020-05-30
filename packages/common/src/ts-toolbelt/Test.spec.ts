import {Fail, Pass, check, checks} from './Test';

describe('Test', () => {
  it('should allow us to import and actually execute checks, check functions', () => {
    checks([
      check<{}, {}, Pass>(),
      check<{}, '', Fail>(),
      check<{}, {}, Pass>(),
      check<{}, '', Fail>(),
      check.extends<{}, {foo: number}, Fail>(),
      check.extends<{foo: number; bar: number}, {foo: number}, Pass>(),
    ]);
  });
});
