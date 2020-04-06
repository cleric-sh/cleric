import {Config} from './Config';
import {ConfigArgs} from './ConfigArgs';
import {Configs} from './Configs';

export const createConfig = <TArgs extends ConfigArgs>(
  configKey: string,
  args: TArgs
): Config<TArgs> => {
  Configs[configKey] = args;
  return {
    ...args,
    _apiLookup: undefined as any,
  };
};
