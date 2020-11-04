import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type55} from '../types/Type55';

export const Type55Guard = (type: t.Any): type is Type55 =>
  type instanceof t.InterfaceType && !!type.props['type55'];

export const Type55Api = createApi('Type55Api', Type55Guard, slice => {
  slice['doType55'] = () => 'Type55';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type55Api: TType extends t.InterfaceType<t.PropsOf<Type55>>
      ? {doType55: () => string}
      : never;
  }
}
