import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type37} from '../types/Type37';

export const Type37Guard = (type: t.Any): type is Type37 =>
  type instanceof t.InterfaceType && !!type.props['type37'];

export const Type37Api = createApi('Type37Api', Type37Guard, slice => {
  slice['doType37'] = () => 'Type37';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type37Api: TType extends t.InterfaceType<t.PropsOf<Type37>>
      ? {doType37: () => string}
      : never;
  }
}
