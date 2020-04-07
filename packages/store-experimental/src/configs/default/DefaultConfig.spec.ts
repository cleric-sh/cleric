import {Pass, checks, checkExtends} from '@cleric/common';
import {Config} from '../../config/Config';
import {DefaultConfig} from './DefaultConfig';
import {ConfigArgs} from '../../config/ConfigArgs';

describe('DefaultConfig', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config<ConfigArgs>;

    checks([checkExtends<actual, expected, Pass>()]);
  });
});
