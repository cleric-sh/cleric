import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type79} from '../types/Type79';

export const Type79Guard = (type: t.Any): type is Type79 =>
  type instanceof t.InterfaceType && !!type.props['type79'];

export const Type79Api = createApi('Type79Api', Type79Guard, slice => {
  slice['doType79'] = () => 'Type79';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type79Api: TType extends t.InterfaceType<t.PropsOf<Type79>>
      ? {doType79: () => string}
      : never;
  }
}
