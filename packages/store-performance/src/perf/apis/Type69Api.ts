import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type69} from '../types/Type69';

export const Type69Guard = (type: t.Any): type is Type69 =>
  type instanceof t.InterfaceType && !!type.props['type69'];

export const Type69Api = createApi('Type69Api', Type69Guard, slice => {
  slice['doType69'] = () => 'Type69';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type69Api: TType extends t.InterfaceType<t.PropsOf<Type69>>
      ? {doType69: () => string}
      : never;
  }
}
