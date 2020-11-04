import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type5} from '../types/Type5';

export const Type5Guard = (type: t.Any): type is Type5 =>
  type instanceof t.InterfaceType && !!type.props['type5'];

export const Type5Api = createApi('Type5Api', Type5Guard, slice => {
  slice['doType5'] = () => 'Type5';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type5Api: TType extends t.InterfaceType<t.PropsOf<Type5>>
      ? {doType5: () => string}
      : never;
  }
}
