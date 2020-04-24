import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type90} from '../types/Type90';

export const Type90Guard = (type: t.Any): type is Type90 =>
  type instanceof t.InterfaceType && !!type.props['type90'];

export const Type90Api = createApi('Type90Api', Type90Guard, slice => {
  slice['doType90'] = () => 'Type90';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type90Api: TType extends t.InterfaceType<t.PropsOf<Type90>>
      ? {doType90: () => string}
      : never;
  }
}
