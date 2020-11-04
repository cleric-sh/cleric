import {Pass, checkExtends, checks} from '@cleric/common';
import {Config} from '../../config/Config';
import {ConfigArgs} from '../../config/ConfigArgs';
import {DefaultConfig} from './DefaultConfig';

describe('DefaultConfig', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config<ConfigArgs>;

    checks([checkExtends<actual, expected, Pass>()]);
  });
});
