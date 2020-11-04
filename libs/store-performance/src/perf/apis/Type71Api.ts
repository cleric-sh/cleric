import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type71} from '../types/Type71';

export const Type71Guard = (type: t.Any): type is Type71 =>
  type instanceof t.InterfaceType && !!type.props['type71'];

export const Type71Api = createApi('Type71Api', Type71Guard, slice => {
  slice['doType71'] = () => 'Type71';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type71Api: TType extends t.InterfaceType<t.PropsOf<Type71>>
      ? {doType71: () => string}
      : never;
  }
}
