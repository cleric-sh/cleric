import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type45} from '../types/Type45';

export const Type45Guard = (type: t.Any): type is Type45 =>
  type instanceof t.InterfaceType && !!type.props['type45'];

export const Type45Api = createApi('Type45Api', Type45Guard, slice => {
  slice['doType45'] = () => 'Type45';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type45Api: TType extends t.InterfaceType<t.PropsOf<Type45>>
      ? {doType45: () => string}
      : never;
  }
}
