import {Config} from './Config';
import {Configs} from './Configs';

export const createConfig = <TConfig extends Config>(
    configKey: string,
    config: TConfig,
    ): TConfig => {
  Configs[configKey] = config;
  return config;
};
