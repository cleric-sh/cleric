import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type22} from '../types/Type22';

export const Type22Guard = (type: t.Any): type is Type22 =>
  type instanceof t.InterfaceType && !!type.props['type22'];

export const Type22Api = createApi('Type22Api', Type22Guard, slice => {
  slice['doType22'] = () => 'Type22';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type22Api: TType extends t.InterfaceType<t.PropsOf<Type22>>
      ? {doType22: () => string}
      : never;
  }
}
