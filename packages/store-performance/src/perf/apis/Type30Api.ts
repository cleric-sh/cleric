import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type30} from '../types/Type30';

export const Type30Guard = (type: t.Any): type is Type30 =>
  type instanceof t.InterfaceType && !!type.props['type30'];

export const Type30Api = createApi('Type30Api', Type30Guard, slice => {
  slice['doType30'] = () => 'Type30';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type30Api: TType extends t.InterfaceType<t.PropsOf<Type30>>
      ? {doType30: () => string}
      : never;
  }
}
