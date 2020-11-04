import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type10} from '../types/Type10';

export const Type10Guard = (type: t.Any): type is Type10 =>
  type instanceof t.InterfaceType && !!type.props['type10'];

export const Type10Api = createApi('Type10Api', Type10Guard, slice => {
  slice['doType10'] = () => 'Type10';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type10Api: TType extends t.InterfaceType<t.PropsOf<Type10>>
      ? {doType10: () => string}
      : never;
  }
}
