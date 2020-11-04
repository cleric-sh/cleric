import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type40} from '../types/Type40';

export const Type40Guard = (type: t.Any): type is Type40 =>
  type instanceof t.InterfaceType && !!type.props['type40'];

export const Type40Api = createApi('Type40Api', Type40Guard, slice => {
  slice['doType40'] = () => 'Type40';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type40Api: TType extends t.InterfaceType<t.PropsOf<Type40>>
      ? {doType40: () => string}
      : never;
  }
}
