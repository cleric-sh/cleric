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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _apiKeys: undefined as any,
  };
};
