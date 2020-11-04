import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type43} from '../types/Type43';

export const Type43Guard = (type: t.Any): type is Type43 =>
  type instanceof t.InterfaceType && !!type.props['type43'];

export const Type43Api = createApi('Type43Api', Type43Guard, slice => {
  slice['doType43'] = () => 'Type43';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type43Api: TType extends t.InterfaceType<t.PropsOf<Type43>>
      ? {doType43: () => string}
      : never;
  }
}
