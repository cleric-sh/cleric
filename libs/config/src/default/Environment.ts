import {Deprecated} from '../configuration/decorators/Deprecated';
import {Use} from '../configuration/decorators/Use';

/**
 * Environment contains default that are required in order to load default for
 * other configuration classes.
 *
 * Values in Environment are loaded directly from ProcessEnv and ConfigFile.
 */
@Use('ProcessEnv', 'ConfigFile')
export class Environment {
  applicationName = '';
  region = 'eu-west-1';
  env = 'TEST';

  get isProduction() {
    return !!(this.env && this.env.toUpperCase() === 'PROD');
  }

  get platformKeysSecretName() {
    // Todo: this key should be provided via env var defined in task defs.
    return this.isProduction ? 'TibberPlatformKeysProduction' : 'TibberPlatformKeysDevelopment';
  }

  get servicesSecretName() {
    // Todo: this key should be provided via env var defined in task defs.
    return this.isProduction ? 'TibberServicesProduction' : 'TibberServicesDevelopment';
  }

  get environmentPrefix() {
    return this.isProduction ? 'prod' : 'test';
  }

  @Deprecated("use 'environmentPrefix' instead.")
  get awsResourcePrefix() {
    return this.environmentPrefix;
  }
}
