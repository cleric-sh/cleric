import {checks, check, Pass} from '@cleric/common';
import {DefaultConfig} from './DefaultConfig';
import {Any} from 'ts-toolbelt';
import {Config} from '../../config/Config';

describe('DefaultConfig', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config;

    checks([check<Any.Extends<actual, expected>, 1, Pass>()]);
  });
});
