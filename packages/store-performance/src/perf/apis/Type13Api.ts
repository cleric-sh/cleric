import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type13} from '../types/Type13';

export const Type13Guard = (type: t.Any): type is Type13 =>
  type instanceof t.InterfaceType && !!type.props['type13'];

export const Type13Api = createApi('Type13Api', Type13Guard, slice => {
  slice['doType13'] = () => 'Type13';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type13Api: TType extends t.InterfaceType<t.PropsOf<Type13>>
      ? {doType13: () => string}
      : never;
  }
}
