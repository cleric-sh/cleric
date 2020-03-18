import { Configs } from './Configs';
import { Config } from './Config';

export const createConfig = <TConfig extends Config>(
  configKey: string,
  config: TConfig,
): TConfig => {
  Configs[configKey] = config;
  return config;
};
