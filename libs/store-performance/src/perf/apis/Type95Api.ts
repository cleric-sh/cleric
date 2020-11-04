import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type95} from '../types/Type95';

export const Type95Guard = (type: t.Any): type is Type95 =>
  type instanceof t.InterfaceType && !!type.props['type95'];

export const Type95Api = createApi('Type95Api', Type95Guard, slice => {
  slice['doType95'] = () => 'Type95';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type95Api: TType extends t.InterfaceType<t.PropsOf<Type95>>
      ? {doType95: () => string}
      : never;
  }
}
