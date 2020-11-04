import {ApiKeysOf} from './ApiKeysOf';
import {ConfigArgs} from './ConfigArgs';

export type Config<TConfig extends ConfigArgs> = TConfig & {
  _apiKeys: ApiKeysOf<TConfig['apis']>;
};
