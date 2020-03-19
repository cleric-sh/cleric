import { checks, check, Pass, Fail } from './Test';

describe('Test', () => {
  it('should allow us to import and actually execute checks, check functions', () => {
    checks([check<{}, {}, Pass>(), check<{}, '', Fail>()]);
  });
});
