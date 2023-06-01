import {Use} from '../configuration/decorators/Use';
import {Environment} from './Environment';
import {Platform} from './Platform';
import {ServiceUrls} from './ServiceUrls';

/**
 * Top level configuration object, containing all other nested configuration default.
 */
@Use('ProcessEnv', 'ConfigFile')
export class Root {
  constructor(readonly environment: Environment) {}

  get idpDiscoveryUrl() {
    // Todo: this key should be provided via AWS Secret Manager and moved to 'Platform'.
    return this.environment.isProduction
      ? 'https://thewall.tibber.com/.well-known/openid-configuration'
      : 'http://auth.tibberdev.com/.well-known/openid-configuration';
  }

  platform = new Platform(this.environment);
  serviceUrls = new ServiceUrls();
}
