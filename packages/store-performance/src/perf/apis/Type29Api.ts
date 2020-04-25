import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type29} from '../types/Type29';

export const Type29Guard = (type: t.Any): type is Type29 =>
  type instanceof t.InterfaceType && !!type.props['type29'];

export const Type29Api = createApi('Type29Api', Type29Guard, slice => {
  slice['doType29'] = () => 'Type29';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type29Api: TType extends t.InterfaceType<t.PropsOf<Type29>>
      ? {doType29: () => string}
      : never;
  }
}
