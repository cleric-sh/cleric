import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type64} from '../types/Type64';

export const Type64Guard = (type: t.Any): type is Type64 =>
  type instanceof t.InterfaceType && !!type.props['type64'];

export const Type64Api = createApi('Type64Api', Type64Guard, slice => {
  slice['doType64'] = () => 'Type64';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type64Api: TType extends t.InterfaceType<t.PropsOf<Type64>>
      ? {doType64: () => string}
      : never;
  }
}
