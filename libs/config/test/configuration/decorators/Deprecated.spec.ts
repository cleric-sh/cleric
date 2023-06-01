import {
  DEPRECATED_METADATA_KEY,
  Deprecated,
} from '../../../src/configuration/decorators/Deprecated';
import {expectDecorator} from '../../_tools/expectDecorator';

describe('Deprecated', () => {
  it('decorates properties and accessors with name of service', () => {
    class Config {
      @Deprecated('FOO')
      public myFirstKey = 'foo';

      @Deprecated('BAR')
      public get mySecondKey() {
        return 'bar';
      }
    }

    const config = new Config();

    expectDecorator(config, 'myFirstKey', DEPRECATED_METADATA_KEY, 'FOO');
    expectDecorator(config, 'mySecondKey', DEPRECATED_METADATA_KEY, 'BAR');
  });
});
