import { ConfigKey } from './ConfigKey';
import { Configs } from './Configs';
import { ConfigTypes } from './ConfigTypes';

export const getConfig = <TConfigKey extends ConfigKey>(configKey: TConfigKey) => {
  const config = Configs[configKey];
  if (!config) throw 'This should never happen...';
  return config as Required<ConfigTypes[TConfigKey]>;
};
