import {getSecretCollection} from 'tibber-aws';
import getConfig from '../src';
import {Selector} from '../src/configuration/select';
import {Root} from '../src/default/Root';
import {createJsonFile} from './_tools/createJsonFile';

/**
 * This test suite requires authenticated AWS credentials to be present, either as ENV VARS or in ~/.aws/credentials.
 */
describe('getConfig', () => {
  const expectedAppName = 'tibber-configuration-tests';

  process.env.TIBBER__APPLICATION_NAME = expectedAppName;
  process.env.TIBBER__SERVICE_URLS__ANALYTICS = 'http://url.from.process.env/analytics';

  createJsonFile('./dist/config.json', {
    platform: {
      redisConnection: 'redis-connection-from-config-file',
    },
    serviceUrls: {
      analytics: 'http://url.from.config.file/analytics',
      cersei: 'http://url.from.config.file/cersei',
    },
  });

  const selected: Selector<Root> = {
    environment: {
      applicationName: true,
      env: true,
      environmentPrefix: true,
    },
    platform: {
      postgresConnection: true,
      redisConnection: true,
    },
    serviceUrls: {
      analytics: true,
      appGateway: true,
      cersei: false,
    },
  };

  describe('test config', () => {
    let actualMessageWrittenToLog = '';

    const config = getConfig(selected, {
      configFilePath: './dist/config.json',
      logger: (message: string) => {
        actualMessageWrittenToLog = message;
      },
    });

    const platform = getSecretCollection('TibberPlatformKeysDevelopment') || {};
    const serviceUrls = getSecretCollection('TibberServicesDevelopment') || {};

    it('loads expected values from sources', () => {
      expect(config).toStrictEqual({
        environment: {
          applicationName: expectedAppName,
          env: 'TEST',
          environmentPrefix: 'test',
        },
        platform: {
          postgresConnection:
            platform['connectionStringNodeJs'] + `?application_name=${expectedAppName}`,
          redisConnection: 'redis-connection-from-config-file',
        },
        serviceUrls: {
          analytics: 'http://url.from.process.env/analytics',
          appGateway: serviceUrls['tibber_app_gateway'],
          cersei: 'http://url.from.config.file/cersei',
        },
      });
    });

    test('selected values are written to log', () => {
      expect(actualMessageWrittenToLog).toMatchSnapshot();
    });

    test('postgresConnection is redacted from log', () => {
      expect(actualMessageWrittenToLog).toContain('"postgresConnection": "[**********]"');
    });

    test('redisConnection is redacted from log', () => {
      expect(actualMessageWrittenToLog).toContain('"redisConnection": "[**********]"');
    });
  });

  describe('prod config', () => {
    process.env.TIBBER__ENV = 'PROD';

    let actualMessageWrittenToLog = '';

    const config = getConfig(selected, {
      configFilePath: './dist/config.json',
      logger: (message: string) => {
        actualMessageWrittenToLog = message;
      },
    });

    const platform = getSecretCollection('TibberPlatformKeysProduction') || {};
    const serviceUrls = getSecretCollection('TibberServicesProduction') || {};

    it('loads expected values from sources', () => {
      expect(config).toStrictEqual({
        environment: {
          applicationName: expectedAppName,
          env: 'PROD',
          environmentPrefix: 'prod',
        },
        platform: {
          postgresConnection:
            platform['connectionStringNodeJs'] + `?application_name=${expectedAppName}`,
          redisConnection: 'redis-connection-from-config-file',
        },
        serviceUrls: {
          analytics: 'http://url.from.process.env/analytics',
          appGateway: serviceUrls['tibber_app_gateway'],
          cersei: 'http://url.from.config.file/cersei',
        },
      });
    });

    test('selected values are written to log', () => {
      expect(actualMessageWrittenToLog).toMatchSnapshot();
    });

    test('postgresConnection is redacted from log', () => {
      expect(actualMessageWrittenToLog).toContain('"postgresConnection": "[**********]"');
    });

    test('redisConnection is redacted from log', () => {
      expect(actualMessageWrittenToLog).toContain('"redisConnection": "[**********]"');
    });
  });
});
