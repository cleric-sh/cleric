import * as t from 'io-ts';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {bar, Bar} from '../types/Bar';

export const BarGuard = (type: unknown): type is typeof bar =>
  type instanceof t.InterfaceType && !!type.props['bar'];

export const BarApi = createApi('BarApi', BarGuard, slice => {
  slice['doBar'] = () => 'Bar';
});

export type BarApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.InterfaceType<t.PropsOf<Bar>> ? {doBar: () => string} : never;

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    BarApi: BarApi<TConfigKey, TType>;
  }
}
