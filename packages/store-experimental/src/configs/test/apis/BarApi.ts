import * as t from 'io-ts';

import {createApi} from '../../../node/api';
import {Bar, bar} from '../types/Bar';

export const BarGuard = (type: t.Any): type is typeof bar =>
  type instanceof t.InterfaceType && !!type.props['bar'];

export const BarApi = createApi('BarApi', BarGuard, slice => {
  slice['doBar'] = () => 'Bar';
});

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    BarApi: TType extends t.InterfaceType<t.PropsOf<Bar>>
      ? {doBar: () => string}
      : never;
  }
}
