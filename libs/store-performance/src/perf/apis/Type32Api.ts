import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type32} from '../types/Type32';

export const Type32Guard = (type: t.Any): type is Type32 =>
  type instanceof t.InterfaceType && !!type.props['type32'];

export const Type32Api = createApi('Type32Api', Type32Guard, slice => {
  slice['doType32'] = () => 'Type32';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type32Api: TType extends t.InterfaceType<t.PropsOf<Type32>>
      ? {doType32: () => string}
      : never;
  }
}
