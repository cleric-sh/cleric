import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type65} from '../types/Type65';

export const Type65Guard = (type: t.Any): type is Type65 =>
  type instanceof t.InterfaceType && !!type.props['type65'];

export const Type65Api = createApi('Type65Api', Type65Guard, slice => {
  slice['doType65'] = () => 'Type65';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type65Api: TType extends t.InterfaceType<t.PropsOf<Type65>>
      ? {doType65: () => string}
      : never;
  }
}
