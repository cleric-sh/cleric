import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type72} from '../types/Type72';

export const Type72Guard = (type: t.Any): type is Type72 =>
  type instanceof t.InterfaceType && !!type.props['type72'];

export const Type72Api = createApi('Type72Api', Type72Guard, slice => {
  slice['doType72'] = () => 'Type72';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type72Api: TType extends t.InterfaceType<t.PropsOf<Type72>>
      ? {doType72: () => string}
      : never;
  }
}
