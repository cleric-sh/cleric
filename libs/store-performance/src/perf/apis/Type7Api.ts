import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type7} from '../types/Type7';

export const Type7Guard = (type: t.Any): type is Type7 =>
  type instanceof t.InterfaceType && !!type.props['type7'];

export const Type7Api = createApi('Type7Api', Type7Guard, slice => {
  slice['doType7'] = () => 'Type7';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type7Api: TType extends t.InterfaceType<t.PropsOf<Type7>>
      ? {doType7: () => string}
      : never;
  }
}
