import {Pass, check, checks} from '@cleric/common';
import {Any} from 'ts-toolbelt';
import {Config} from '../../config/Config';
import {DefaultConfig} from './DefaultConfig';

describe('DefaultConfig', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config;

    checks([check<Any.Extends<actual, expected>, 1, Pass>()]);
  });
});
