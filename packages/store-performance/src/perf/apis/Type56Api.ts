import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type56} from '../types/Type56';

export const Type56Guard = (type: t.Any): type is Type56 =>
  type instanceof t.InterfaceType && !!type.props['type56'];

export const Type56Api = createApi('Type56Api', Type56Guard, slice => {
  slice['doType56'] = () => 'Type56';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type56Api: TType extends t.InterfaceType<t.PropsOf<Type56>>
      ? {doType56: () => string}
      : never;
  }
}
