import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type42} from '../types/Type42';

export const Type42Guard = (type: t.Any): type is Type42 =>
  type instanceof t.InterfaceType && !!type.props['type42'];

export const Type42Api = createApi('Type42Api', Type42Guard, slice => {
  slice['doType42'] = () => 'Type42';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type42Api: TType extends t.InterfaceType<t.PropsOf<Type42>>
      ? {doType42: () => string}
      : never;
  }
}
