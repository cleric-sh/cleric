import {ConfigKey} from './ConfigKey';
import {Configs} from './Configs';
import {ConfigTypes} from './ConfigTypes';

export const getConfig = <TConfigKey extends ConfigKey>(
  configKey: TConfigKey
) => {
  const config = Configs[configKey];
  if (!config)
    throw `Config '${configKey} is missing, have you forgotten to add it to the 'Configs' interface, or are you missing an import?'`;
  return config as Required<ConfigTypes[TConfigKey]>;
};
