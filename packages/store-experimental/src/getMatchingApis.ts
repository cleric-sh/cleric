import { ConfigKey, getApis } from './config';
import * as t from 'io-ts';

export const getMatchingApis = (configKey: ConfigKey, types: t.Any[]) => {
  const apis = getApis(configKey);
  return apis.filter(api => types.findIndex(type => api.guard(type)) > -1);
};
