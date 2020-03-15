import { ApiKey } from '../apis';
import { TypeError } from '@cleric/common';
import * as t from 'io-ts';
import { SliceApi } from '../apis/SliceApi';

export interface Configs {}

export const Configs: Partial<Configs> = {};

export type ConfigKey = keyof Configs;

export interface Config {
  apis: readonly SliceApi<ApiKey, t.Any>[];
}

export type GetApis<
  TConfigKey extends ConfigKey,
  TConfig = Configs[TConfigKey]
> = TConfig extends Readonly<Config>
  ? TConfig['apis']
  : TypeError<'Configuration must be a tuple of SliceApis.'>;

export const getApis = <TConfigKey extends ConfigKey>(configKey: TConfigKey) =>
  Configs[configKey]['apis'] as Config['apis'];
