import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type19} from '../types/Type19';

export const Type19Guard = (type: t.Any): type is Type19 =>
  type instanceof t.InterfaceType && !!type.props['type19'];

export const Type19Api = createApi('Type19Api', Type19Guard, slice => {
  slice['doType19'] = () => 'Type19';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type19Api: TType extends t.InterfaceType<t.PropsOf<Type19>>
      ? {doType19: () => string}
      : never;
  }
}
