import {AwsSecretKey} from '../configuration/decorators/AwsSecretKey';
import {Sensitive} from '../configuration/decorators/Sensitive';
import {Use} from '../configuration/decorators/Use';
import {Environment} from './Environment';

/**
 * Configuration object for platform default, such as DB connection strings.
 *
 * Values in Platform are loaded directly from PlatformSecret in AWS Secret Manager,
 * but can be overridden by sources in parent classes with a higher precedence.
 */
@Use('PlatformSecret')
export class Platform {
  constructor(private readonly core: Environment) {}

  @AwsSecretKey('connectionStringNodeJs')
  private _postgresConnection = '';

  @Sensitive()
  get postgresConnection() {
    const name = this.core.applicationName;
    return name ? this._postgresConnection + `?application_name=${name}` : this._postgresConnection;
  }

  @Sensitive()
  @AwsSecretKey('redisConfiguration')
  redisConnection = '';
}
