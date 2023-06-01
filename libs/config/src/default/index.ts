import {configure as configureAws} from 'tibber-aws';
import {IConfigArgs} from '../configuration/configure';
import {populate} from '../configuration/populate/populate';
import {AwsSecretSource, Sources} from '../configuration/sources';
import {ConfigFileSource} from '../configuration/sources';
import {ProcessEnvSource} from '../configuration/sources';
import {Environment} from './Environment';
import {Root} from './Root';

export interface DefaultConfigArgs extends IConfigArgs {
  configFilePath: string;
}

export const DefaultConfigArgs: DefaultConfigArgs = {
  configFilePath: './config.json',
};

export function DefaultConfig(args: DefaultConfigArgs) {
  const {configFilePath} = args;

  /**
   * 'sources' determines the order of precedence of values. Values from
   * higher sources are preferred to lower sources.
   */
  const sources: Sources = [
    ['ProcessEnv', new ProcessEnvSource(['TIBBER'])],
    ['ConfigFile', new ConfigFileSource(configFilePath)],
  ];

  /**
   * Remarks: Ideally, we wouldn't need to populate Environment first, and we could just
   * populate a single configuration object, but since AwsSecretSources load different
   * secret keys based on whether or not 'env' is 'PROD' or not, we need to load them
   * first. In the future, we should consider running the production cluster in a separate
   * production AWS project, so that the Secret Keys can be static. Then the 'Environment'
   * configuration object can be rolled into Root and loaded in a single call to 'populate'..
   */
  const environment = populate(sources, Environment);

  const {platformKeysSecretName, region, servicesSecretName} = environment;

  configureAws({region});

  sources.push(['PlatformSecret', new AwsSecretSource(platformKeysSecretName)]);
  sources.push(['ServicesSecret', new AwsSecretSource(servicesSecretName)]);

  return populate(sources, Root, environment);
}

export default DefaultConfig;
