import { ApiKey } from '../apis';
import { TError } from '@cleric/common';
import { SliceApi } from '../apis/SliceApi';
import { List, Union } from 'ts-toolbelt';

export interface Configs {}

export const Configs: Partial<Configs> = {};

export type ConfigKey = keyof Configs;

export type SliceApis = SliceApi<ApiKey, any>[];

export type Config = {
  apis: SliceApis;
};

export type AsTuple<L extends List.List<any>> = L extends List.List<infer L>
  ? Union.ListOf<L>
  : never;

export type GetApis<
  TConfigKey extends ConfigKey,
  TConfig = NonNullable<Configs[TConfigKey]>
> = TConfig extends Config
  ? TConfig['apis'] extends List.List<infer L>
    ? Union.ListOf<L> // This step ensures that typed arrays are converted into tuples.
    : TError<"Configuration's apis property is not assignable to interface 'List'.">
  : TError<"Configuration is not assignable to interface 'Config'.">;

export const getConfig = <TConfigKey extends ConfigKey>(configKey: TConfigKey) => {
  const config = Configs[configKey];
  if (!config) throw 'This should never happen...';
  return config as Required<Configs[TConfigKey]>;
};

export const createConfig = <TConfig extends Config>(
  configKey: string,
  config: TConfig,
): TConfig => {
  Configs[configKey] = config;
  return config;
};
