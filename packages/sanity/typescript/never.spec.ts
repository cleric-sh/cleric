import {checks, check, Pass, Fail} from '@cleric/common';
import {Extends} from 'Any/Extends';

describe('never', () => {
  it('should do stuff', () => {
    checks([check<Extends<never, {}>, 0, Pass>()]);
    checks([check<Extends<{}, never>, 0, Pass>()]);
    checks([check<Extends<never, never>, 1, Fail>()]);
  });
});
