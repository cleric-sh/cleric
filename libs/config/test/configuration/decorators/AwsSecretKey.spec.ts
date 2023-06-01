import {
  AwsSecretKey,
  AwsSecretKeyMetadataKey,
} from '../../../src/configuration/decorators/AwsSecretKey';
import {expectDecorator} from '../../_tools/expectDecorator';

describe('AwsSecretKey', () => {
  it('decorates properties and accessors with name of service', () => {
    class Config {
      @AwsSecretKey('FOO')
      public myFirstKey = 'foo';

      @AwsSecretKey('BAR')
      public get mySecondKey() {
        return 'bar';
      }
    }

    const config = new Config();

    expectDecorator(config, 'myFirstKey', AwsSecretKeyMetadataKey, 'FOO');
    expectDecorator(config, 'mySecondKey', AwsSecretKeyMetadataKey, 'BAR');
  });
});
