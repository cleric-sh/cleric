import { ConfigKey, getApis, SliceApis } from './config';
import * as t from 'io-ts';
import { SliceApi } from './apis/SliceApi';

export const getMatchingApis = (configKey: ConfigKey, types: t.Any[]): SliceApis => {
  const apis = getApis(configKey);
  return (apis.filter(
    api => types.findIndex(type => api.guard(type)) > -1,
  ) as unknown) as SliceApis;
};
