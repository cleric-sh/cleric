import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type70} from '../types/Type70';

export const Type70Guard = (type: t.Any): type is Type70 =>
  type instanceof t.InterfaceType && !!type.props['type70'];

export const Type70Api = createApi('Type70Api', Type70Guard, slice => {
  slice['doType70'] = () => 'Type70';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type70Api: TType extends t.InterfaceType<t.PropsOf<Type70>>
      ? {doType70: () => string}
      : never;
  }
}
