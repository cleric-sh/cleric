import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type81} from '../types/Type81';

export const Type81Guard = (type: t.Any): type is Type81 =>
  type instanceof t.InterfaceType && !!type.props['type81'];

export const Type81Api = createApi('Type81Api', Type81Guard, slice => {
  slice['doType81'] = () => 'Type81';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type81Api: TType extends t.InterfaceType<t.PropsOf<Type81>>
      ? {doType81: () => string}
      : never;
  }
}
