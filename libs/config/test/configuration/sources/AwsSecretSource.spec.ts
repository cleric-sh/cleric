import {configure, getSecret} from 'tibber-aws';
import {AwsSecretKey} from '../../../src/configuration/decorators/AwsSecretKey';
import {AwsSecretSource} from '../../../src/configuration/sources/AwsSecretSource';

/**
 * This test suite requires authenticated AWS credentials to be present, either as ENV VARS or in ~/.aws/credentials.
 */
describe('AwsSecretSource', () => {
  configure({region: 'eu-west-1'});
  const source = new AwsSecretSource('TibberServicesDevelopment');

  it('can read values from AWS Secret Manager', () => {
    class MyClass {
      @AwsSecretKey('tibber_app_gateway')
      foo = '';
    }
    const myClass = new MyClass();
    const value = source.get(myClass, 'foo');
    const expected = getSecret('TibberServicesDevelopment', 'tibber_app_gateway');
    expect(value).toBe(expected);
  });
});
