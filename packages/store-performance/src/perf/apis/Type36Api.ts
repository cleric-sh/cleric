import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type36} from '../types/Type36';

export const Type36Guard = (type: t.Any): type is Type36 =>
  type instanceof t.InterfaceType && !!type.props['type36'];

export const Type36Api = createApi('Type36Api', Type36Guard, slice => {
  slice['doType36'] = () => 'Type36';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type36Api: TType extends t.InterfaceType<t.PropsOf<Type36>>
      ? {doType36: () => string}
      : never;
  }
}
