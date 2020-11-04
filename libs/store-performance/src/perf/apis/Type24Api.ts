import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type24} from '../types/Type24';

export const Type24Guard = (type: t.Any): type is Type24 =>
  type instanceof t.InterfaceType && !!type.props['type24'];

export const Type24Api = createApi('Type24Api', Type24Guard, slice => {
  slice['doType24'] = () => 'Type24';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type24Api: TType extends t.InterfaceType<t.PropsOf<Type24>>
      ? {doType24: () => string}
      : never;
  }
}
