import '../configs/test';

import {Pass, check, checks} from '@cleric/common';
import {Extends} from 'Any/Extends';
import {GetConfig, getConfig} from './getConfig';
import {TestConfig} from '../configs/test';

describe('GetConfig', () => {
  it('Returns Config object corresponding to key.', () => {
    type actual = GetConfig<'Test'>;
    type expected = typeof TestConfig;

    checks([check<Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);

    const config = getConfig('Test');
    for (const api of config.apis) {
      expect(api).not.toBe(undefined);
      expect(api.key).not.toBe(undefined);
      expect(api.guard).not.toBe(undefined);
      expect(api.decorator).not.toBe(undefined);
    }
  });
});
