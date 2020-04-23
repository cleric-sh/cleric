import {TError} from '@cleric/common';

import {List} from 'List/_api';
import {Config} from './Config';
import {ConfigKey} from './ConfigKey';
import {ConfigTypes} from './ConfigTypes';
import {Configs} from './Configs';

export const getConfig = <TConfigKey extends ConfigKey>(
  configKey: TConfigKey
) => {
  const config = Configs[configKey];
  if (!config)
    throw `Config '${configKey} is missing, have you forgotten to add it to the 'Configs' interface, or are you missing an import?'`;
  return (config as unknown) as Required<ConfigTypes[TConfigKey]>;
};

export type GetConfig<
  TConfigKey extends ConfigKey,
  TConfig = ConfigTypes[TConfigKey]
> = TConfig extends Config<infer Args>
  ? Args['apis'] extends List<unknown>
    ? TConfig // This step ensures that typed arrays are converted into tuples.
    : TError<
        "Configuration's 'apis' property must be an Array or Tuple of SliceApis."
      >
  : TError<"Configuration is not assignable to interface 'Config'.">;
