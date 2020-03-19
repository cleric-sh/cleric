import { createApi } from '../../slice/api';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';
import { Bar } from '../types/Bar';

export const BarGuard = (type: t.Any): type is typeof Bar =>
  type instanceof t.InterfaceType && !!type.props['bar'];

export const BarApi = createApi('BarApi', BarGuard, (configKey, type, slice) => {
  slice['doBar'] = () => 'Bar';
});

export type BarApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.InterfaceType<infer P>
  ? { doBar: () => string }
  : never;

declare module '../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    BarApi: BarApi<TConfigKey, TType>;
  }
}
