import { ConfigKey, getConfig, SliceApis } from './config';
import * as t from 'io-ts';

export const getMatchingApis = (configKey: ConfigKey, types: t.Any[]): SliceApis => {
  const apis = getConfig(configKey).apis;
  return (apis.filter(
    api => types.findIndex(type => api.guard(type)) > -1,
  ) as unknown) as SliceApis;
};
